# Overview

SDK for Router chain.

Refer to the documentation of Router chain SDK (ts): https://router-protocol.github.io/router-chain-ts-sdk/modules.html

## Features

With this SDK, broadly following things can be done on Router chain -

- Create a transaction.
- Sign a transaction.
- Broadcast a transaction.
- Read any data and state.

## Installation

```bash
yarn add @routerprotocol/router-chain-sdk-ts
```

or

```bash
npm i @routerprotocol/router-chain-sdk-ts
```

## Code Snippets

<details><summary>Fetch an account's balance.</summary>
<p>

```ts
import {
  getEndpointsForNetwork,
  Network,
} from '@routerprotocol/router-chain-sdk-ts';

const endpoint = getEndpointsForNetwork(Network.Devnet);
const bankClient = new ChainGrpcBankApi(endpoint.grpcEndpoint);

// Fetch all balances of an account
const accountBalances = await bankClient.fetchBalances(
  'router16sqwdtdxjl6zdvx49rvayhkyelfrhavpmknxh9'
);
console.log(accountBalances);

// Fetch particular coin's balance of an account
const routersBalances = await bankClient.fetchBalance({
  accountAddress: 'router16sqwdtdxjl6zdvx49rvayhkyelfrhavpmknxh9',
  denom: 'route',
});
console.log(routersBalances);
```

Sample response -

```shell
{
	balances: [ { denom: 'route', amount: '1000000000000000000000' } ],
	pagination: { total: 1, next: '' }
}

{ denom: 'route', amount: '1000000000000000000000' }
```

</p>
</details>

<details><summary>Create a raw transaction.</summary>
<p>

`createTransaction` returns the raw transaction and signed bytes. The `signbytes` can be signed and broadcasted to the chain.

```ts
const {
  DEFAULT_STD_FEE,
  createTransaction,
} = require('@routerprotocol/router-chain-sdk-ts');

const { signBytes, txRaw } = createTransaction({
  message: message.toDirectSign(),
  memo: '',
  fee: DEFAULT_STD_FEE,
  pubKey: publicKey,
  sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
  accountNumber: parseInt(aliceAccount.account.base_account.account_number, 10),
  chainId: CHAIN_ID,
});
```

</p>
</details>

<details><summary>Transfer funds.</summary>
<p>

Given below is an example of bank transaction which can be used to send transfer funds -

```jsx
const {
  getEndpointsForNetwork,
  Network,
  ChainRestAuthApi,
  PrivateKey,
  DEFAULT_STD_FEE,
  TxRestClient,
  createTransaction,
  MsgSend,
  privateKeyToPublicKeyBase64,
  isValidAddress,
  devnetChainInfo,
} = require('@routerprotocol/router-chain-sdk-ts');

const ROUTER_TO_SEND = '10';

const amount = {
  amount: expandDecimals(ROUTER_TO_SEND, 18).toString(),
  denom: 'route',
};

const endpoint = getEndpointsForNetwork(Network.Devnet);
const privateKeyHash = FAUCET_ACCOUNT_KEY;

/** Intializing Faucet wallet from the private key */
const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);
const alice = privateKey.toBech32();
const alice_pubkey = privateKey.toPublicKey();

const publicKey = privateKeyToPublicKeyBase64(
  Buffer.from(privateKeyHash, 'hex')
);

/** Prepare the Message */
const message = MsgSend.fromJSON({
  amount,
  srcRouterAddress: alice,
  dstRouterAddress: destinationAddress,
});

/** Get Faucet Accounts details */
const aliceAccount = await new ChainRestAuthApi(
  endpoint.lcdEndpoint
).fetchAccount(alice);

/** Create Raw Transaction */
const { signBytes, txRaw } = createTransaction({
  message: message.toDirectSign(),
  memo: '',
  fee: DEFAULT_STD_FEE,
  pubKey: publicKey,
  sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
  accountNumber: parseInt(aliceAccount.account.base_account.account_number, 10),
  chainId: devnetChainInfo.chainId,
});

/** Sign transaction */
const signature = await privateKey.sign(signBytes);

/** Append Signatures */
txRaw.setSignaturesList([signature]);

const txService = new TxRestClient(endpoint.lcdEndpoint);

/** Broadcast transaction */
const txResponse = await txService.broadcast(txRaw);

console.log(
  `Broadcasted transaction hash: ${JSON.stringify(txResponse.txhash)}`
);
```

Given below is an example of how `MsgStoreCode` can be used to upload a wasm contract file to router chain -

```ts
import {
  getEndpointsForNetwork,
  Network,
  getNetworkType,
  MsgStoreCode,
  PrivateKey,
  privateKeyToPublicKeyBase64,
  ChainRestAuthApi,
  createTransaction,
  DEFAULT_STD_FEE,
	BigNumberInBase,
  TxGrpcClient,
  TxRestClient,
  MsgInstantiateContract,
} from '../../router-chain-ts-sdk/src/';
import { sha256 } from '@cosmjs/crypto';
import { logs } from '@cosmjs/stargate';
import pako from 'pako';
import _m0 from 'protobufjs/minimal';
import * as fs from 'fs';

const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);

const alice = privateKey.toBech32();
const alice_pubkey = privateKey.toPublicKey();

const publicKey = privateKeyToPublicKeyBase64(
	Buffer.from(privateKeyHash, "hex")
);

const endpoint =  getEndpointsForNetwork(Network.Devnet);

const restClient = new TxRestClient(endpoint.lcdEndpoint);

/** Get Faucet Accounts details */
  const aliceAccount = await new ChainRestAuthApi(
    endpoint.lcdEndpoint
  ).fetchAccount(alice);
  console.log(`aliceAccount => ${JSON.stringify(aliceAccount)}`);

  const compressed = pako.gzip(wasmCode, { level: 9 });

  const storeCodeMsg = MsgStoreCode.fromJSON({
    sender: alice,
    wasm: wasmCode,
  });

  const { signBytes, txRaw } = createTransaction({
		message: storeCodeMsg.toDirectSign(),
		memo: "",
		fee: {
			amount: [
				{
					amount: new BigNumberInBase(4000000000)
						.times(500000000)
						.toString(),
					denom: "route",
				},
			],
			gas: (500000000).toString(),
		},
		pubKey: publicKey,
		sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
		accountNumber: parseInt(
			aliceAccount.account.base_account.account_number,
			10
		),
		chainId: "router-1",
	});

  /** Sign transaction */
  const signature = await privateKey.sign(signBytes);

  /** Append Signatures */
  txRaw.setSignaturesList([signature]);

  /** Broadcast transaction */
  let txxResponse = await restClient.broadcast(txRaw);
	let txResponse = await restClient. waitTxBroadcast(txxResponse.txhash);
	console.log(`txResponse =>`, JSON.stringify(txResponse));

  const parsedLogs = logs.parseRawLog(txResponse.raw_log);
  const codeIdAttr = logs.findAttribute(parsedLogs, 'store_code', 'code_id');
  const codeId = Number.parseInt(codeIdAttr.value, 10),
  console.log(`deployedContract code id  =>`, codeId);
```

</p>
</details>

<details><summary>Instantiate a contract.</summary>
<p>

With `MsgInstantiateContract` we can instantiate the deployed contract with `codeId` -

```ts
import {
  getEndpointsForNetwork,
  getNetworkType,
  MsgStoreCode,
  PrivateKey,
  privateKeyToPublicKeyBase64,
  ChainRestAuthApi,
  createTransaction,
  DEFAULT_STD_FEE,
  BigNumberInBase,
  TxGrpcClient,
  TxRestClient,
  MsgInstantiateContract,
} from '../../router-chain-ts-sdk/src/';
import { sha256 } from '@cosmjs/crypto';
import { logs } from '@cosmjs/stargate';
import pako from 'pako';
import _m0 from 'protobufjs/minimal';
import * as fs from 'fs';

const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);

const alice = privateKey.toBech32();
const alice_pubkey = privateKey.toPublicKey();

const publicKey = privateKeyToPublicKeyBase64(
  Buffer.from(privateKeyHash, 'hex')
);

const endpoint = getEndpointsForNetwork(Network.Devnet);

const restClient = new TxRestClient(endpoint.lcdEndpoint);
const aliceAccount = await new ChainRestAuthApi(
  endpoint.lcdEndpoint
).fetchAccount(alice);
console.log(`aliceAccount => ${JSON.stringify(aliceAccount)}`);

const intantiateContractMsg = MsgInstantiateContract.fromJSON({
  sender: alice,
  admin: alice,
  codeId: deployedContract.codeId,
  label: 'Mayank! Hello World',
  msg: {},
});

const instantiateTx = createTransaction({
  message: intantiateContractMsg.toDirectSign(),
  memo: '',
  fee: {
    amount: [
      {
        amount: new BigNumberInBase(4000000000).times(500000000).toString(),
        denom: 'route',
      },
    ],
    gas: (500000000).toString(),
  },
  pubKey: publicKey,
  sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
  accountNumber: parseInt(aliceAccount.account.base_account.account_number, 10),
  chainId: 'router-1',
});

/** Sign transaction */
const signature = await privateKey.sign(instantiateTx.signBytes);

/** Append Signatures */
instantiateTx.txRaw.setSignaturesList([signature]);
const txService = new TxGrpcClient(endpoint.grpcEndpoint);

/** Broadcast transaction */
const txResponse = await restClient.broadcast(instantiateTx.txRaw);
console.log(
  `Broadcasted Instantiate transaction hash: ${JSON.stringify(
    txResponse.txhash
  )}`
);
``;
const parsedLogs = logs.parseRawLog(txResponse1.raw_log);
const contractAddressAttr = logs.findAttribute(
  parsedLogs,
  'instantiate',
  '_contract_address'
);
console.log(`Deployed contract address =>`, contractAddressAttr);
```

</p>
</details>

<details><summary>Query a contract.</summary>
<p>

```ts
import {
  toUtf8,
  ChainGrpcWasmApi,
  getEndpointsForNetwork,
  getNetworkType,
  ChainGrpcBankApi,
} from '../../router-chain-ts-sdk/src';

const endpoint = getEndpointsForNetwork(Network.Devnet);

const wasmClient = new ChainGrpcWasmApi(endpoint.grpcEndpoint);
const bankClient = new ChainGrpcBankApi(endpoint.grpcEndpoint);
const request = {
  address: 'router1aaf9r6s7nxhysuegqrxv0wpm27ypyv4886medd3mrkrw6t4yfcns8a2l0y',
  queryData: toUtf8(JSON.stringify({ fetch_white_listed_contract: {} })),
};
const fetchRawContractStateResult = await wasmClient.fetchRawContractState(
  request.address,
  request.queryData
);
console.log('fetchRawContractState DATA =>', fetchRawContractStateResult);

const fetchContractCodeResult = await wasmClient.fetchContractCode(7);
console.log('fetchContractCodeResult =>', fetchContractCodeResult);

const fetchContractCodesResult = await wasmClient.fetchContractCodes();
console.log('fetchContractCodesResult =>', fetchContractCodesResult);

const fetchContractCodeContractsResult = await wasmClient.fetchContractCodeContracts(
  7
);
console.log(
  'fetchContractCodeContractsResult =>',
  fetchContractCodeContractsResult
);

const fetchContractHistoryResult = await wasmClient.fetchContractHistory(
  request.address
);
console.log('fetchContractHistoryResult =>', fetchContractHistoryResult);

const fetchContractInfoResult = await wasmClient.fetchContractInfo(
  request.address
);
console.log('fetchContractInfoResult =>', fetchContractInfoResult);

const fetchSmartContractStateResult = await wasmClient.fetchSmartContractState(
  request.address,
  request.queryData
);
console.log('fetchSmartContractStateResult =>', fetchSmartContractStateResult);

const fetchBalanceResult = await bankClient.fetchBalance({
  accountAddress: 'router1m0s0544sgdczf2sm6l8v6py7rrpr8a2cvnjezx',
  denom: 'route',
});
console.log('fetchBalanceResult =>', fetchBalanceResult);
```

</p>
</details>

<details><summary>Execute a query.</summary>
<p>

With `MsgExecuteContract` you can execute any query on Router Chain.

```ts
import {
  getEndpointsForNetwork,
  getNetworkType,
  MsgStoreCode,
  PrivateKey,
  privateKeyToPublicKeyBase64,
  ChainRestAuthApi,
  createTransaction,
  DEFAULT_STD_FEE,
  BigNumberInBase,
  TxGrpcClient,
  TxRestClient,
  MsgInstantiateContract,
} from '../../router-chain-ts-sdk/src/';
import { sha256 } from '@cosmjs/crypto';
import { logs } from '@cosmjs/stargate';
import pako from 'pako';
import _m0 from 'protobufjs/minimal';
import { MsgExecuteContract } from '@routerprotocol/router-chain-sdk-ts';

const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);

const alice = privateKey.toBech32();
const alice_pubkey = privateKey.toPublicKey();

const publicKey = privateKeyToPublicKeyBase64(
  Buffer.from(privateKeyHash, 'hex')
);
const restClient = new TxRestClient(endpoint.lcdEndpoint);

/** Get Faucet Accounts details */
const aliceAccount = await new ChainRestAuthApi(
  endpoint.lcdEndpoint
).fetchAccount(alice);

const executeContractMsg = MsgExecuteContract.fromJSON({
  sender: alice,
  action: 'white_list_application_contract',
  contractAddress:
    'router1aaf9r6s7nxhysuegqrxv0wpm27ypyv4886medd3mrkrw6t4yfcns8a2l0y',
  msg: {
    chain_id: '80001',
    chain_type: 0,
    contract_address: [
      171,
      132,
      131,
      246,
      77,
      156,
      109,
      30,
      207,
      155,
      132,
      154,
      230,
      119,
      221,
      51,
      21,
      131,
      92,
      178,
    ],
  },
});

const { signBytes, txRaw } = createTransaction({
  message: executeContractMsg.toDirectSign(),
  memo: '',
  fee: {
    amount: [
      {
        amount: new BigNumberInBase(4000000000).times(500000000).toString(),
        denom: 'route',
      },
    ],
    gas: (500000000).toString(),
  },
  pubKey: publicKey,
  sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
  accountNumber: parseInt(aliceAccount.account.base_account.account_number, 10),
  chainId: 'router-1',
});

/** Sign transaction */
const signature = await privateKey.sign(signBytes);

/** Append Signatures */
txRaw.setSignaturesList([signature]);

/** Broadcast transaction */
let txxResponse = await restClient.broadcast(txRaw);
let txResponse = await restClient.waitTxBroadcast(txxResponse.txhash);
console.log(`txResponse =>`, txResponse);
```

</p>
</details>

<details><summary>Interact with router chain using Metamask</summary>
<p>For send chain transaction messages like MsgSend for bank transfer -

```ts
import { ROUTER_DENOM, Network, MsgSend } from "@routerprotocol/router-chain-sdk-ts";

const amount = {
      amount: "10000000000000000000",
      denom: ROUTER_DENOM,
    };

const msgSendMsg = MsgSend.fromJSON({
  amount,
  srcRouterAddress: getRouterSignerAddress(window.ethereum.selectedAddress),
  dstRouterAddress: destinationAddress,
});
const RPC = getEndpointsForNetwork(Network.Testnet).lcdEndpoint
const tx = await sendEthTxnToRouterChain({
  networkEnv: Network.testnet,
  txMsg: msgSendMsg,
  nodeUrl: RPC,
  ethereumAddress: accountAddress,
  injectedSigner: window.ethereum,
});
const txHash = tx.tx_response.txhash
const restClient = new TxRestClient(RPC);
const txResponse = await restClient.waitTxBroadcast(txHash);
```

Executing a query on cosmwasm smart contract -

```ts
import {
  ROUTER_DENOM,
  Network,
  MsgExecuteCwContract,
} from '@routerprotocol/router-chain-sdk-ts';

const restClient = new TxRestClient(
  getEndpointsForNetwork(Network.Testnet).lcdEndpoint
);

const tx = await executeQueryInjected({
  networkEnv: Network.Testnet,
  contractAddress: 'router10390.......',
  executeMsg: { query: 'xyz' },
  nodeUrl: getEndpointsForNetwork(Network.Testnet).lcdEndpoint,
  ethereumAddress: window.ethereum.selectedAddress,
  metmaskSigner: window.ethereum,
});
const txHash = tx.tx_response.txhash;
const txResponse = await restClient.waitTxBroadcast(txHash);
```

</p>
</details>

<details><summary>Execute a query.</summary>
<p>

With `MsgExecuteContract` you can execute any query on Router Chain.

```ts
import {
  getEndpointsForNetwork,
  getNetworkType,
  MsgStoreCode,
  PrivateKey,
  privateKeyToPublicKeyBase64,
  ChainRestAuthApi,
  createTransaction,
  DEFAULT_STD_FEE,
  BigNumberInBase,
  TxGrpcClient,
  TxRestClient,
  MsgInstantiateContract,
} from '../../router-chain-ts-sdk/src/';
import { sha256 } from '@cosmjs/crypto';
import { logs } from '@cosmjs/stargate';
import pako from 'pako';
import _m0 from 'protobufjs/minimal';
import { MsgExecuteContract } from '@routerprotocol/router-chain-sdk-ts';

const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);

const alice = privateKey.toBech32();
const alice_pubkey = privateKey.toPublicKey();

const publicKey = privateKeyToPublicKeyBase64(
  Buffer.from(privateKeyHash, 'hex')
);
const restClient = new TxRestClient(endpoint.lcdEndpoint);

/** Get Faucet Accounts details */
const aliceAccount = await new ChainRestAuthApi(
  endpoint.lcdEndpoint
).fetchAccount(alice);

const executeContractMsg = MsgExecuteContract.fromJSON({
  sender: alice,
  action: 'white_list_application_contract',
  contractAddress:
    'router1aaf9r6s7nxhysuegqrxv0wpm27ypyv4886medd3mrkrw6t4yfcns8a2l0y',
  msg: {
    chain_id: '80001',
    chain_type: 0,
    contract_address: [
      171,
      132,
      131,
      246,
      77,
      156,
      109,
      30,
      207,
      155,
      132,
      154,
      230,
      119,
      221,
      51,
      21,
      131,
      92,
      178,
    ],
  },
});

const { signBytes, txRaw } = createTransaction({
  message: executeContractMsg.toDirectSign(),
  memo: '',
  fee: {
    amount: [
      {
        amount: new BigNumberInBase(4000000000).times(500000000).toString(),
        denom: 'route',
      },
    ],
    gas: (500000000).toString(),
  },
  pubKey: publicKey,
  sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
  accountNumber: parseInt(aliceAccount.account.base_account.account_number, 10),
  chainId: 'router-1',
});

/** Sign transaction */
const signature = await privateKey.sign(signBytes);

/** Append Signatures */
txRaw.setSignaturesList([signature]);

/** Broadcast transaction */
let txxResponse = await restClient.broadcast(txRaw);
let txResponse = await restClient.waitTxBroadcast(txxResponse.txhash);
console.log(`txResponse =>`, txResponse);
```

</p>
</details>

## Common Errors

For using the SDK with UI it is recommended to use node version v18.12.1 or above.

If you get webpack errors when using with create-react-app, follow these steps -

1. Install craco and required packages.

```bash
yarn add -D @craco/craco
```

```bash
yarn add -D path-browserify stream-browserify stream-http https-browserify os-browserify assert url buffer process crypto-browsify fs
```

2. Add craco.config.js file in your project root.

```jsx
//craco.config.js

const { ProvidePlugin } = require('webpack');
module.exports = {
  webpack: {
    configure: webpackConfig => {
      return {
        ...webpackConfig,
        resolve: {
          ...webpackConfig.resolve,
          fallback: {
            ...(webpackConfig.resolve?.fallback ?? {}),
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer/'),
            crypto: require.resolve('crypto-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            assert: require.resolve('assert/'),
            url: require.resolve('url/'),
          },
        },
        plugins: [
          ...(webpackConfig.plugins ?? []),
          new ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
          new ProvidePlugin({
            process: 'process/browser',
          }),
        ],
      };
    },
  },
};
```

3. Replace these scripts in package.json.

```ts
"scripts": {
		-  ~~"start": "react-scripts start"~~
		+  "start": "craco start"
		-  ~~"build": "react-scripts build"~~
		+  "build": "craco build"
		-  ~~"test": "react-scripts test"~~
		+  "test": "craco test"
}
```

4. yarn start and the webpack errors should be gone.

If you get webpack errors when using vue’s nuxt framework, do this small change in `nuxt.config.js` build key -

```jsx
build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.js$/, // apply this rule to .js files
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // use the preset-env preset
          },
        },
      });
    },
  }
```
