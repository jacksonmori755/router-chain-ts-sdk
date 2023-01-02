const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } = require("@cosmjs/stargate");

const mnemonic = "surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
const [firstAccount] = await wallet.getAccounts();
console.log(`firstAccount => ${firstAccount}`)
const rpcEndpoint = "https://devnet-alpha.lcd.routerprotocol.com/";
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

const recipient = "router10ugpyau4anvygzhcfejzmq3jjl7qfs9hk4537s";
const amount = {
  denom: 'route',
  amount: '123',
};
const result = await client.sendTokens(firstAccount.address, recipient, [amount], "Have fun with your star coins");
assertIsBroadcastTxSuccess(result);