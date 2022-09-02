const {
  assertIsBroadcastTxSuccess,
  SigningStargateClient,
  StargateClient,
} = require('@cosmjs/stargate');
// const rpc = "rpc.sentry-01.theta-testnet.polypore.xyz:26657"
// const rpc = "devnet-alpha.routerprotocol.com"
// const rpc = "devnet-alpha.lcd.routerprotocol.com"
const rpc = 'https://devnet-alpha.tm.routerprotocol.com';
const { DirectSecp256k1HdWallet, Registry } = require('@cosmjs/proto-signing');
const { ethers } = require('ethers');
const { getNetworkInfo, Network } = require('@injectivelabs/networks');
const { ChainRestAuthApi } = require('@injectivelabs/sdk-ts');
const { PrivateKey } = require('@injectivelabs/sdk-ts/dist/local');
const {
  privateKeyToPublicKeyBase64,
  MsgSend,
  DEFAULT_STD_FEE,
} = require('@injectivelabs/sdk-ts');
const { createTransaction } = require('@injectivelabs/tx-ts');
const {
  TxGrpcClient,
  TxClient,
  TxRestClient,
} = require('@injectivelabs/tx-ts/dist/client');
const { BigNumberInBase } = require('@injectivelabs/utils');

const testClient = async () => {
  const mnemonic ='shell long equal habit book group twist shine century lift urban note stand sponsor once expect dish mule aim artist ancient enemy logic search';
    // const wallet1 = await ethers.Wallet.fromMnemonic(mnemonic);
    // console.log('Address fetched from wallet', await wallet1.getAddress());

    const wallet = PrivateKey.fromMnemonic(mnemonic);
    const routerAddress = wallet.toBech32();
    console.log(`routerAddress => ${routerAddress}`);
    const client = await SigningStargateClient.connectWithSigner(rpc, wallet);
  console.log(
    'With client, chain id:',
    await client.getChainId(),
    ', height:',
    await client.getHeight()
  );
  const sender = 'router10ugpyau4anvygzhcfejzmq3jjl7qfs9hk4537s';
  const recipient = 'router1m08mjhph4nrekxuca50s8mqkawh9gfl7lj8e9x';
  console.log(
    'sender Balances Before:',
    await client.getAllBalances(sender)
  );
  console.log(
    'recipient Balances Before:',
    await client.getAllBalances(recipient)
  );
   const amount = {
     amount: new BigNumberInBase(0.01).toWei().toFixed(),
     denom: 'router',
   };
  const result = await client.sendTokens(
    sender,
    recipient,
    [amount],
    'Sent Router'
  );
    assertIsBroadcastTxSuccess(result);
    console.log(`tx result => ${JSON.stringify(result)}`)
    console.log(
    'recipient Balances after:',
    await client.getAllBalances(recipient)
    );
};

try {
  testClient();
} catch (e) {
  console.log(`Error => ${JSON.stringify(e)}`);
}
