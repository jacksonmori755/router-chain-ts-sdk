// import { ChainRestAuthApi } from '../src';
// import { PrivateKey } from '../src';
// import { DEFAULT_STD_FEE } from '../src';
// import { privateKeyToPublicKeyBase64 } from '../src';
// import { TxClient, TxGrpcClient } from '../src';
// import { createTransaction } from '../src';
// import { MsgSend } from '../src';
// // describe('SDK-TS test', async () => {
// //   it('Broadcast test', );
// // });
// console.log(ChainRestAuthApi);
// const run = async () => {
//   const privateKeyHash =
//     '';
//   const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);
//   const alice = privateKey.toBech32();
//   const alice_pubkey = privateKey.toPublicKey();

//   const publicKey = privateKeyToPublicKeyBase64(
//     Buffer.from(privateKeyHash, 'hex')
//   );

//   console.log('alice_pubkey', alice_pubkey.toBase64(), 'pubkey', publicKey);

//   console.log(
//     'Alice Address',
//     alice,
//     'Bob address',
//     'router1afnvujzp5rhgspwney0p7vdfvc293g7ajwu7te'
//   );
//   // /** Prepare the Message */
//   const amount = {
//     amount: '1000000000000000',
//     denom: 'route',
//   };

//   const message = MsgSend.fromJSON({
//     amount,
//     srcRouterAddress: alice,
//     dstRouterAddress: 'router1afnvujzp5rhgspwney0p7vdfvc293g7ajwu7te',
//   });

//   // const aliceAccount = await new ChainRestAuthApi(
//   //   'https://devnet-alpha.lcd.routerprotocol.com'
//   // ).fetchAccount(alice);
//   // console.log(`aliceAccount => ${JSON.stringify(aliceAccount)}`);

//   const aliceAccount = {
//     account: {
//       '@type': '/routerprotocol.routerchain.types.EthAccount',
//       base_account: {
//         address: 'router1m08mjhph4nrekxuca50s8mqkawh9gfl7lj8e9x',
//         pub_key: null,
//         account_number: '6',
//         sequence: '0',
//       },
//       code_hash: 'xdJGAYb3IzySfn2y3McDwOUAtlPKgic7e/rYBF2FpHA=',
//     },
//   };

//   /** Prepare the Transaction **/
//   const { signBytes, txRaw } = createTransaction({
//     message: message.toDirectSign(),
//     memo: '',
//     fee: DEFAULT_STD_FEE,
//     // pubKey: Buffer.from(publicKey).toString("base64"),
//     pubKey: publicKey,
//     sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
//     accountNumber: parseInt(
//       aliceAccount.account.base_account.account_number,
//       10
//     ),
//     chainId: 'router-1',
//   });

//   /** Sign transaction */
//   const signature = await privateKey.sign(signBytes);

//   /** Append Signatures */
//   txRaw.setSignaturesList([signature]);

//   /** Calculate hash of the transaction */
//   console.log(`Transaction Hash: ${await TxClient.hash(txRaw)}`);

//   const txService = new TxGrpcClient(
//     'https://devnet-alpha.grpcweb.routerprotocol.com'
//   );

//   /** Simulate transaction */
//   const simulationResponse = await txService.simulate(txRaw);
//   console.log(
//     `Transaction simulation response: ${JSON.stringify(
//       simulationResponse.gasInfo
//     )}`
//   );

//   console.log(
//     'txRaw',
//     JSON.stringify(txRaw),
//     'signature',
//     JSON.stringify(signature)
//   );

//   /** Broadcast transaction */
//   const txResponse = await txService.broadcast(txRaw);
//   console.log(
//     `Broadcasted transaction hash: ${JSON.stringify(txResponse.txhash)}`
//   );

//   //
//   expect('haha').toBeDefined();
// };

// run();
