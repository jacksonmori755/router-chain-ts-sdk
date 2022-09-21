const { getNetworkInfo, Network } = require("@injectivelabs/networks");
const { ChainRestAuthApi } = require("@injectivelabs/sdk-ts");
const { PrivateKey } = require("@injectivelabs/sdk-ts/dist/local");
const {
  privateKeyToPublicKeyBase64,
  MsgSend,
  DEFAULT_STD_FEE,
} = require("@injectivelabs/sdk-ts");
const { createTransaction } = require("@injectivelabs/tx-ts");
const { TxGrpcClient, TxClient, TxRestClient } = require("@injectivelabs/tx-ts/dist/client");
const { BigNumberInBase } = require("@injectivelabs/utils");
const { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } = require("@cosmjs/stargate")

/** MsgSend Example */
const testFunction = async () => {
    //const network = getNetworkInfo(Network.Public);
  /*

export const localChainInfo: ChainInfo = {
  feeDenom: 'inj',
  chainId: 'injective-1',
  env: 'local',
}
const urlEndpointsLocal: NetworkEndpoints = {
  exchangeApi: 'https://localhost:4444',
  indexerApi: 'https://localhost:4444',
  chronosApi: 'https://localhost:4444',
  sentryGrpcApi: 'http://localhost:9091',
  tendermintApi: 'http://localhost:9091',
  sentryHttpApi: 'http://localhost:9091',
  exchangeWeb3GatewayApi: 'https://localhost:4445',
}  

*/
  const privateKeyHash = "843EE93DA70C08B88C726C43329B8DA92CC26AEFE2A0F3F33832A0540E66EA53";
  const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);
  const routerAddress = privateKey.toBech32();
  const publicKey = privateKeyToPublicKeyBase64(
    Buffer.from(privateKeyHash, "hex")
  );

  console.log(`routerAddress => ${routerAddress}`)
  console.log(`publicKey => ${publicKey}`)
  // /** Account Details **/
  const accountDetails = await new ChainRestAuthApi(
    "https://devnet-alpha.lcd.routerprotocol.com/"
  ).fetchAccount(routerAddress);
  console.log(`accountDetails => ${JSON.stringify(accountDetails)}`)
  // /** Prepare the Message */
  const amount = {
    amount: new BigNumberInBase(0.01).toWei().toFixed(),
    denom: "router",
  };

  const msg = MsgSend.fromJSON({
    amount,
    srcRouterAddress: routerAddress,
    dstRouterAddress: "router10ugpyau4anvygzhcfejzmq3jjl7qfs9hk4537s",
  });

  /** Prepare the Transaction **/
  const { signBytes, txRaw } = createTransaction({
    message: msg.toDirectSign(),
    memo: "",
    fee: DEFAULT_STD_FEE,
    pubKey: Buffer.from(publicKey).toString("base64"),
    sequence: parseInt(accountDetails.account.base_account.sequence, 10),
    accountNumber: parseInt(
      accountDetails.account.base_account.account_number,
      10
    ),
    chainId: "router-1",
  });

  // console.log(`signBytes => ${JSON.stringify(signBytes)}`)
  // console.log(`txraw => ${JSON.stringify(txRaw)}`)
  // console.log(`txRaw.serializeBinary() => ${txRaw.serializeBinary()}`)
  /** Sign transaction */
  const signature = await privateKey.sign(signBytes);

  /** Append Signatures */
  txRaw.setSignaturesList([signature]);

  /** Calculate hash of the transaction */
  console.log(`Transaction Hash: ${await TxClient.hash(txRaw)}`);
  const txService = new TxGrpcClient('tcp://devnet-alpha.routerprotocol.com');

  /** Simulate transaction */
  const simulationResponse = await txService.simulate(txRaw);
  console.log(
    `Transaction simulation response: ${JSON.stringify(
      simulationResponse.gasInfo
    )}`
  );

  /** Broadcast transaction */
  const txResponse = await txService.broadcast(txRaw);
  console.log(
    `Broadcasted transaction hash: ${JSON.stringify(txResponse.txhash)}`
  );
};

try {
  testFunction()
} catch (e) {
  console.log(`Error Print => ${e}`)
}