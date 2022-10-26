import {
  getEndpointsForNetwork,
  getNetworkType,
  MsgStoreCode,
  PrivateKey,
  privateKeyToPublicKeyBase64,
  ChainRestAuthApi,
  createTransaction,
  TxGrpcClient,
  DEFAULT_STD_FEE,
} from '../src';
import { sha256 } from '@cosmjs/crypto';
import { logs } from '@cosmjs/stargate';
import pako from 'pako';
import _m0 from 'protobufjs/minimal';
import * as fs from 'fs';

function toHex(data: any) {
  let out = '';
  for (const byte of data) {
    out += ('0' + byte.toString(16)).slice(-2);
  }
  return out;
}

const uploadContract = async (wasmCode: Uint8Array) => {
  const network = getEndpointsForNetwork(getNetworkType('devnet'));
  const privateKeyHash =
    '91327BBEBCE69AF2E51ECFE11E034FD88ED686711E8659B5FFA2A7829B3B43E0';

  /** Intializing Faucet wallet from the private key */
  const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);
  const alice = privateKey.toBech32();
  const alice_pubkey = privateKey.toPublicKey();

  const publicKey = privateKeyToPublicKeyBase64(
    Buffer.from(privateKeyHash, 'hex')
  );

  console.log('alice_pubkey', alice_pubkey.toBase64(), 'pubkey', publicKey);

  /** Get Faucet Accounts details */
  const aliceAccount = await new ChainRestAuthApi(
    network.lcdEndpoint
  ).fetchAccount(alice);
  console.log(`aliceAccount => ${JSON.stringify(aliceAccount)}`);

  const compressed = pako.gzip(wasmCode, { level: 9 });
  console.log('compressed =>', compressed);

  const storeCodeMsg = MsgStoreCode.fromJSON({
    sender: alice,
    wasm: wasmCode,
  });

  console.log('storeCodeMsg =>', storeCodeMsg);

  const { signBytes, txRaw } = createTransaction({
    message: storeCodeMsg.toDirectSign(),
    memo: '',
    fee: DEFAULT_STD_FEE,
    pubKey: publicKey,
    sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
    accountNumber: parseInt(
      aliceAccount.account.base_account.account_number,
      10
    ),
    chainId: 'router-1',
  });

  /** Sign transaction */
  const signature = await privateKey.sign(signBytes);
  // console.log(`signature => ${JSON.stringify(signature)}`);

  /** Append Signatures */
  txRaw.setSignaturesList([signature]);

  //console.log(`tx => ${txRaw}`);

  const txService = new TxGrpcClient(network.grpcEndpoint);

  /** Broadcast transaction */
  const txResponse = await txService.broadcast(txRaw);
  console.log(
    `Broadcasted transaction hash: ${JSON.stringify(txResponse.txhash)}`
  );
  // if (isDeliverTxFailure(result)) {
  // 	throw new Error(createDeliverTxResponseErrorMessage(result));
  // }
  const parsedLogs = logs.parseRawLog(txResponse.rawLog);
  const codeIdAttr = logs.findAttribute(parsedLogs, 'store_code', 'code_id');
  return {
    originalSize: wasmCode.length,
    originalChecksum: toHex(sha256(wasmCode)),
    compressedSize: compressed.length,
    compressedChecksum: toHex(sha256(compressed)),
    codeId: Number.parseInt(codeIdAttr.value, 10),
    logs: parsedLogs,
    height: txResponse.height,
    transactionHash: txResponse.txhash,
    gasWanted: txResponse.gasWanted,
    gasUsed: txResponse.gasUsed,
  };
};

const wasm = fs.readFileSync('./hello_router.wasm');
uploadContract(wasm);
