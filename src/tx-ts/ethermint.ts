import { AccountDetails } from '../types/auth';

export interface Chain {
  chainId: number;
  cosmosChainId: string;
}

export interface Sender {
  accountAddress: string;
  sequence: number;
  accountNumber: number;
  pubkey: string;
}

export interface Fee {
  amount: string;
  denom: string;
  gas: string;
}

export interface TxContext {
  chain: Chain;
  sender: Sender;
  fee: Fee;
  memo: string;
}

export interface EIP712TypedData {
  types: object;
  message: object | object[];
}

export interface TxPayload {
  signDirect: {
    body: Proto.Cosmos.Transactions.Tx.TxBody;
    authInfo: Proto.Cosmos.Transactions.Tx.AuthInfo;
    signBytes: string;
  };
  legacyAmino: {
    body: Proto.Cosmos.Transactions.Tx.TxBody;
    authInfo: Proto.Cosmos.Transactions.Tx.AuthInfo;
    signBytes: string;
  };
  eipToSign: EIP712ToSign;
}

const constructChain = (evmChainId: number, cosmosChainId: string) => {
  return {
    chainId: evmChainId,
    cosmosChainId: cosmosChainId,
  };
};

const constructSender = (accountDetails: AccountDetails) => {
  return {
    accountAddress: accountDetails.address,
    sequence: accountDetails.sequence,
    accountNumber: accountDetails.accountNumber,
    pubkey: accountDetails.pubKey.key ?? '',
  };
};

const constructFee = (amount: string, denom: string, gas: string) => {
  return {
    amount,
    denom,
    gas,
  };
};

export const getTxContext = (
  evmChainId: number,
  cosmosChainId: string,
  accountDetails: AccountDetails,
  amount: string,
  denom: string,
  gas: string,
  memo = ''
): TxContext => {
  return {
    chain: constructChain(evmChainId, cosmosChainId),
    sender: constructSender(accountDetails),
    fee: constructFee(amount, denom, gas),
    memo,
  };
};

export function createEIP712(types: object, chainId: number, message: object) {
  return {
    types,
    primaryType: 'Tx',
    domain: {
      name: 'Cosmos Web3',
      version: '1.0.0',
      chainId,
      verifyingContract: 'cosmos',
      salt: '0',
    },
    message,
  };
}

export function generateMessageWithMultipleTransactions(
  accountNumber: string,
  sequence: string,
  chainCosmosId: string,
  memo: string,
  fee: object,
  msgs: object[]
) {
  return {
    account_number: accountNumber,
    chain_id: chainCosmosId,
    fee,
    memo,
    msgs,
    sequence,
  };
}

export function generateMessage(
  accountNumber: string,
  sequence: string,
  chainCosmosId: string,
  memo: string,
  fee: object,
  msg: object
) {
  return generateMessageWithMultipleTransactions(
    accountNumber,
    sequence,
    chainCosmosId,
    memo,
    fee,
    [msg]
  );
}

export function generateTypes(msgValues: object) {
  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'string' },
      { name: 'salt', type: 'string' },
    ],
    Tx: [
      { name: 'account_number', type: 'string' },
      { name: 'chain_id', type: 'string' },
      { name: 'fee', type: 'Fee' },
      { name: 'memo', type: 'string' },
      { name: 'msgs', type: 'Msg[]' },
      { name: 'sequence', type: 'string' },
    ],
    Fee: [
      { name: 'feePayer', type: 'string' },
      { name: 'amount', type: 'Coin[]' },
      { name: 'gas', type: 'string' },
    ],
    Coin: [
      { name: 'denom', type: 'string' },
      { name: 'amount', type: 'string' },
    ],
    Msg: [
      { name: 'type', type: 'string' },
      { name: 'value', type: 'MsgValue' },
    ],
  };
  Object.assign(types, msgValues);
  return types;
}

export function generateFee(
  amount: string,
  denom: string,
  gas: string,
  feePayer: string
) {
  return {
    amount: [
      {
        amount,
        denom,
      },
    ],
    gas,
    feePayer,
  };
}

const wrapTypeToArray = <T>(obj: T | T[]) => {
  return Array.isArray(obj) ? obj : [obj];
};

const createEIP712Payload = (
  context: TxContext,
  typedData: EIP712TypedData
) => {
  const { fee, sender, chain, memo } = context;

  const feeObject = generateFee(
    fee.amount,
    fee.denom,
    fee.gas,
    sender.accountAddress
  );

  const payloadMessages = wrapTypeToArray(typedData.message);

  const messages = generateMessageWithMultipleTransactions(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    memo,
    feeObject,
    payloadMessages
  );

  return createEIP712(typedData.types, chain.chainId, messages);
};
export function createTransactionWithMultipleMessages(
  messages: any,
  memo: string,
  fee: string,
  denom: string,
  gasLimit: number,
  algo: string,
  pubKey: string,
  sequence: number,
  accountNumber: number,
  chainId: string
) {
  const body = createBodyWithMultipleMessages(messages, memo);
  const feeMessage = createFee(fee, denom, gasLimit);
  const pubKeyDecoded = Buffer.from(pubKey, 'base64');

  // AMINO
  const signInfoAmino = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    LEGACY_AMINO
  );

  const authInfoAmino = createAuthInfo(signInfoAmino, feeMessage);

  const signDocAmino = createSigDoc(
    body.toBinary(),
    authInfoAmino.toBinary(),
    chainId,
    accountNumber
  );

  const hashAmino = new Keccak(256);
  hashAmino.update(Buffer.from(signDocAmino.toBinary()));
  const toSignAmino = hashAmino.digest('binary');

  // SignDirect
  const signInfoDirect = createSignerInfo(
    algo,
    new Uint8Array(pubKeyDecoded),
    sequence,
    SIGN_DIRECT
  );

  const authInfoDirect = createAuthInfo(signInfoDirect, feeMessage);

  const signDocDirect = createSigDoc(
    body.toBinary(),
    authInfoDirect.toBinary(),
    chainId,
    accountNumber
  );

  const hashDirect = new Keccak(256);
  hashDirect.update(Buffer.from(signDocDirect.toBinary()));
  const toSignDirect = hashDirect.digest('binary');

  return {
    legacyAmino: {
      body,
      authInfo: authInfoAmino,
      signBytes: toSignAmino.toString('base64'),
    },
    signDirect: {
      body,
      authInfo: authInfoDirect,
      signBytes: toSignDirect.toString('base64'),
    },
  };
}
const createCosmosPayload = (
  context: TxContext,
  cosmosPayload: any | any[] // TODO: re-export Protobuf Message type from /proto
) => {
  const { fee, sender, chain, memo } = context;

  const messages = wrapTypeToArray(cosmosPayload);

  return createTransactionWithMultipleMessages(
    messages,
    memo,
    fee.amount,
    fee.denom,
    parseInt(fee.gas, 10),
    'ethsecp256',
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    chain.cosmosChainId
  );
};

export const createTransactionPayload = (
  context: TxContext,
  typedData: EIP712TypedData,
  cosmosMessage: any // TODO: re-export Protobuf Message type from /proto
): TxPayload => {
  const eip712Payload = createEIP712Payload(context, typedData);

  const cosmosPayload = createCosmosPayload(context, cosmosMessage);

  return {
    signDirect: cosmosPayload.signDirect,
    legacyAmino: cosmosPayload.legacyAmino,
    eipToSign: eip712Payload,
  };
};

export const getTxPayload = (context: TxContext, params: any) => {
  const typedData = createEIP712Msg(context, params);
  const cosmosMsg = createCosmosMsg(context, params);

  return createTransactionPayload(context, typedData, cosmosMsg);
};
