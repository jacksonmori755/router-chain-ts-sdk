import { EthereumChainId } from '../ts-types';
import BigNumberInBase from '../utils/classes/BigNumber/BigNumberInBase';
import snakecaseKeys from 'snakecase-keys';
import { DEFAULT_GAS_LIMIT, DEFAULT_STD_FEE } from '../utils';
import { Msgs } from './msgs';
import { getTypesIncludingFeePayer } from './utils';

export type Eip712ConvertTxArgs = {
  accountNumber: string;
  sequence: string;
  timeoutHeight: string;
  chainId: string;
  memo?: string;
};

export type Eip712ConvertFeeArgs = {
  amount?: string;
  denom?: string;
  gas?: number;
  feePayer?: string;
};

export interface TypedDataField {
  name: string;
  type: string;
}

export type MapOfTypedDataField = Map<string, TypedDataField[]>;

export const getEip712Domain = (ethereumChainId: EthereumChainId) => {
  return {
    domain: {
      name: 'Router Web3',
      version: '1.0.0',
      chainId: '0x' + new BigNumberInBase(ethereumChainId).toString(16),
      salt: '0',
      verifyingContract: 'cosmos',
    },
  };
};

export const getDefaultEip712Types = () => {
  return {
    types: {
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
        { name: 'timeout_height', type: 'string' },
      ],
      Fee: [
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
    },
  };
};

export const getEip712Tx = ({
  msgs,
  tx,
  fee,
  ethereumChainId,
}: {
  msgs: Msgs | Msgs[];
  tx: Eip712ConvertTxArgs;
  fee?: Eip712ConvertFeeArgs;
  ethereumChainId: EthereumChainId;
}) => {
  const actualMsgs = Array.isArray(msgs) ? msgs : [msgs];
  const [msg] = actualMsgs;

  const msgTypes = msg.toEip712Types();
  const types = getDefaultEip712Types();
  const actualTypes = {
    types: {
      ...types.types,
      ...Object.fromEntries(msgTypes),
    },
  };

  const eip712Msgs = actualMsgs.map(m => m.toEip712());

  if (fee && fee.feePayer) {
    types.types['Fee'].push({ name: 'feePayer', type: 'string' });
  }

  return {
    primaryType: 'Tx',
    ...actualTypes,
    ...getEip712Domain(ethereumChainId),
    message: {
      ...getEipTxDetails(tx),
      ...getEip712Fee(fee),
      msgs: eip712Msgs,
    },
  };
};

export const getEip712Fee = (
  params?: Eip712ConvertFeeArgs
): {
  fee: {
    amount: { amount: string; denom: string }[];
    gas: string;
    feePayer?: string;
  };
} => {
  if (!params) {
    return {
      fee: {
        ...DEFAULT_STD_FEE,
        gas: DEFAULT_GAS_LIMIT.toFixed(),
      },
    };
  }

  const { amount, denom, gas, feePayer } = params;
  const actualGas = new BigNumberInBase(gas || DEFAULT_GAS_LIMIT).toFixed();

  if (!amount || !denom) {
    return {
      fee: {
        ...DEFAULT_STD_FEE,
        gas: actualGas,
        feePayer,
      },
    };
  }

  return {
    fee: {
      amount: [{ amount: amount, denom: denom }],
      gas: actualGas,
      feePayer: feePayer,
    },
  };
};

export const getEipTxDetails = ({
  accountNumber,
  sequence,
  timeoutHeight,
  chainId,
  memo,
}: Eip712ConvertTxArgs): {
  account_number: string;
  chain_id: string;
  sequence: string;
  timeout_height: string;
  memo: string;
} => {
  return {
    account_number: accountNumber,
    chain_id: chainId,
    timeout_height: timeoutHeight,
    memo: memo || '',
    sequence,
  };
};

export const objectKeysToEip712Types = (
  object: Record<string, any>,
  primaryType = 'MsgValue'
) => {
  const output = new Map<string, TypedDataField[]>();
  const types = new Array<TypedDataField>();

  for (const property in snakecaseKeys(object)) {
    if (property === '@type' || property === 'type') {
      continue;
    }

    const val = snakecaseKeys(object)[property];
    const type = typeof val;

    if (type === 'boolean') {
      types.push({ name: property, type: 'bool' });
    } else if (type === 'number' || type === 'bigint') {
      types.push({ name: property, type: getNumberType(property) });
    } else if (type === 'string') {
      types.push({ name: property, type: 'string' });
    } else if (type === 'object') {
      if (Array.isArray(val) && val.length === 0) {
        throw new Error('Array with length 0 found');
      } else if (Array.isArray(val) && val.length > 0) {
        const arrayFirstType = typeof val[0];
        const isPrimitive =
          arrayFirstType === 'boolean' ||
          arrayFirstType === 'number' ||
          arrayFirstType === 'string';

        if (isPrimitive) {
          for (const arrayEntry in val) {
            if (typeof arrayEntry !== arrayFirstType) {
              throw new Error('Array with different types found');
            }
          }

          if (arrayFirstType === 'boolean') {
            types.push({ name: property, type: 'bool[]' });
          } else if (arrayFirstType === 'number') {
            types.push({ name: property, type: 'number[]' });
          } else if (arrayFirstType === 'string') {
            types.push({ name: property, type: 'string[]' });
          }
        } else if (arrayFirstType === 'object') {
          const recursiveOutput = objectKeysToEip712Types(val[0], primaryType);
          const recursiveTypes = recursiveOutput.get(primaryType);
          const propertyType = `Type${property.charAt(0).toUpperCase() +
            property.substring(1)}`;

          types.push({ name: property, type: `${propertyType}[]` });
          output.set(propertyType, recursiveTypes!);

          for (const key in recursiveOutput) {
            if (key !== primaryType) {
              output.set(key, recursiveOutput.get(key)!);
            }
          }
        } else {
          throw new Error('Array with elements of unknown type found');
        }
      } else {
        const recursiveOutput = objectKeysToEip712Types(val, primaryType);
        const recursiveTypes = recursiveOutput.get(primaryType);
        const propertyType = `Type${property.charAt(0).toUpperCase() +
          property.substring(1)}`;

        types.push({ name: property, type: propertyType });
        output.set(propertyType, recursiveTypes!);

        for (const key in recursiveOutput) {
          if (key !== primaryType) {
            output.set(key, recursiveOutput.get(key)!);
          }
        }
      }
    } else {
      throw new Error(`Type ${property} not found`);
    }
  }

  output.set(primaryType, types);

  return output;
};

export const getEip712TypedData = ({
  msgs,
  tx,
  fee,
  ethereumChainId,
}: {
  msgs: Msgs | Msgs[];
  tx: Eip712ConvertTxArgs;
  fee?: Eip712ConvertFeeArgs;
  ethereumChainId: EthereumChainId;
}) => {
  const messages = Array.isArray(msgs) ? msgs : [msgs];
  const eip712Msgs = messages.map(m => m.toEip712());
  const eip712MessageTypes = messages[0].toEip712Types();

  const types = getDefaultEip712Types();
  const typesWithMessageTypes = {
    types: {
      ...types.types,
      ...Object.fromEntries(eip712MessageTypes),
    },
  };
  const typesWithFeePayer = getTypesIncludingFeePayer({
    fee,
    types: typesWithMessageTypes,
  });

  return {
    primaryType: 'Tx',
    ...typesWithFeePayer,
    ...getEip712Domain(ethereumChainId),
    message: {
      ...getEipTxDetails(tx),
      ...getEip712Fee(fee),
      msgs: eip712Msgs,
    },
  };
};


export const protoTypeToAminoType = (type: string): string => {
  const actualType = type.startsWith('/') ? type.substring(1) : type;

  switch (actualType) {
    // Auth
    case 'cosmos.auth.v1beta1.MsgUpdateParams':
      return 'cosmos-sdk/x/auth/MsgUpdateParams';

    // Authz
    case 'cosmos.authz.v1beta1.MsgGrant':
      return 'cosmos-sdk/MsgGrant';
    case 'cosmos.authz.v1beta1.MsgRevoke':
      return 'cosmos-sdk/MsgRevoke';
    case 'cosmos.authz.v1beta1.MsgExec':
      return 'cosmos-sdk/MsgExec';

    // Bank
    case 'cosmos.bank.v1beta1.MsgSend':
      return 'cosmos-sdk/MsgSend';
    case 'cosmos.bank.v1beta1.MsgMultiSend':
      return 'cosmos-sdk/MsgMultiSend';
    case 'cosmos.bank.v1beta1.MsgUpdateParams':
      return 'cosmos-sdk/x/bank/MsgUpdateParams';

    // Distribution
    case 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      return 'cosmos-sdk/MsgWithdrawDelegationReward';
    case 'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
      return 'cosmos-sdk/MsgWithdrawValCommission';
    case 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
      return 'cosmos-sdk/MsgModifyWithdrawAddress';
    case 'cosmos.distribution.v1beta1.MsgFundCommunityPool':
      return 'cosmos-sdk/MsgFundCommunityPool';
    case 'cosmos.distribution.v1beta1.MsgUpdateParams':
      return 'cosmos-sdk/distribution/MsgUpdateParams';

    // Gov
    case 'cosmos.gov.v1beta1.MsgSubmitProposal':
      return 'cosmos-sdk/MsgSubmitProposal';
    case 'cosmos.gov.v1beta1.MsgDeposit':
      return 'cosmos-sdk/MsgDeposit';
    case 'cosmos.gov.v1beta1.MsgVote':
      return 'cosmos-sdk/MsgVote';
    case 'cosmos.gov.v1beta1.MsgVoteWeighted':
      return 'cosmos-sdk/MsgVoteWeighted';

    // Staking
    case 'cosmos.staking.v1beta1.MsgCreateValidator':
      return 'cosmos-sdk/MsgCreateValidator';
    case 'cosmos.staking.v1beta1.MsgEditValidator':
      return 'cosmos-sdk/MsgEditValidator';
    case 'cosmos.staking.v1beta1.MsgDelegate':
      return 'cosmos-sdk/MsgDelegate';
    case 'cosmos.staking.v1beta1.MsgUndelegate':
      return 'cosmos-sdk/MsgUndelegate';
    case 'cosmos.staking.v1beta1.MsgBeginRedelegate':
      return 'cosmos-sdk/MsgBeginRedelegate';
    case 'cosmos.staking.v1beta1.MsgCancelUnbondingDelegation':
      return 'cosmos-sdk/MsgCancelUnbondingDelegation';
    case 'cosmos.staking.v1beta1.MsgUpdateParams':
      return 'cosmos-sdk/x/staking/MsgUpdateParams';

    // IBC
    case 'ibc.applications.transfer.v1.MsgTransfer':
      return 'cosmos-sdk/MsgTransfer';

    default:
      throw new Error('Unknown message type: ' + type);
  }
};

export const getNumberType = (property?: string) => {
  if (!property) {
    return 'uint256';
  }

  switch (true) {
    case ['order_mask'].includes(property):
      return 'int32';
    default:
      'uint256';
  }

  return 'uint256';
};
