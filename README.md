# Overview

sdk-ts is an utility built to interact with Router Chain from node.js or browser based applications. With the functions present inside the sdk-ts you can broadly do the following things -

- Read from Router Chain
- Create a transaction
- Sign a transaction
- Broadcast a transaction to Router Chain

You can add sdk-ts package in your node project via yarn or npm -

```jsx
yarn add @routerprotocol/router-chain-sdk-ts
(or) 
npm i @routerprotocol/router-chain-sdk-ts
```

## UI Support

For using the package with UI it is recommended to use node version v18.12.1 and above 

With create-next-app this package works totally fine , just make sure your node version is v18.12.1 or higher.

With create-react-app the package might give you webpack errors to resolve it follow the steps below -  

```jsx
1. Install craco 
	 yarn add -D @craco/craco
2. Add craco.config.js file in your project directory with same path as package.json
	 craco.config.js content below - 

		const { ProvidePlugin } = require("webpack");
		module.exports = {
		  webpack: {
		    configure: (webpackConfig) => {
		      return {
		        ...webpackConfig,
		        resolve: {
		          ...webpackConfig.resolve,
		          fallback: {
		            ...(webpackConfig.resolve?.fallback ?? {}),
		            path: require.resolve("path-browserify"),
		            stream: require.resolve("stream-browserify"),
		            buffer: require.resolve("buffer/"),
		            crypto: require.resolve("crypto-browserify"),
		            http: require.resolve("stream-http"),
		            https: require.resolve("https-browserify"),
		            os: require.resolve("os-browserify/browser"),
		            assert: require.resolve("assert/"),
		            url: require.resolve("url/"),
		          },
		        },
		        plugins: [
		          ...(webpackConfig.plugins ?? []),
		          new ProvidePlugin({
		            Buffer: ["buffer", "Buffer"],
		          }),
		          new ProvidePlugin({
		            process: "process/browser",
		          }),
		        ],
		      };
		    },
		  },
		};

3. Do add these packages 
	 yarn add path-browserify stream-browserify stream-http https-browserify os-browserify assert url

4. Replace these scripts in package.json
		"scripts": {
		-  ~~"start": "react-scripts start"~~
		+  "start": "craco start"
		-  ~~"build": "react-scripts build"~~
		+  "build": "craco build"
		-  ~~"test": "react-scripts test"~~
		+  "test": "craco test"
		}
5. yarn start and the webpack errors should be gone.
```

## Usage/Examples

Below is an example given that demonstrates how to fetch balance - 

```jsx
import {getEndpointsForNetwork} from "@routerprotocol/router-chain-sdk-ts"

const network = getEndpointsForNetwork(networkEnvironment);
const bankClient = new ChainGrpcBankApi(network.grpcEndpoint);

/* Fetch all balances for a account */
   const accountBalances = await bankClient.fetchBalances(
     "router16sqwdtdxjl6zdvx49rvayhkyelfrhavpmknxh9"
   );
   console.log(accountBalances);
/* 
{
  balances: [ { denom: 'route', amount: '1000000000000000000000' } ],
  pagination: { total: 1, next: '' }
}
*/

/* Fetch a particular account's balance for a particular denom */
  const routersBalances = await bankClient.fetchBalance({
    accountAddress: "router16sqwdtdxjl6zdvx49rvayhkyelfrhavpmknxh9",
    denom: "route",
   });
  console.log(routersBalances);
/* 
{ denom: 'route', amount: '1000000000000000000000' }
*/
```

Function `createTransaction`  returns the raw transaction and signed bytes. The `signbytes` can be signed and broadcast it to the chain. 

```jsx
const {
  DEFAULT_STD_FEE,
  createTransaction
} = require("@routerprotocol/router-chain-sdk-ts");  
  
/** Create Raw Transaction */
    const { signBytes, txRaw } = createTransaction({
      message: message.toDirectSign(),
      memo: "",
      fee: DEFAULT_STD_FEE,
      pubKey: publicKey,
      sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
      accountNumber: parseInt(
        aliceAccount.account.base_account.account_number,
        10
      ),
      chainId: CHAIN_ID,
    });
```

Given below an example of bank transaction which can be used to send transfer funds -

```jsx
const {
  getEndpointsForNetwork,
  ChainRestAuthApi,
  PrivateKey,
  DEFAULT_STD_FEE,
  TxRestClient,
  createTransaction,
  MsgSend,
  privateKeyToPublicKeyBase64,
  isValidAddress,
	devnetChainInfo
} = require("@routerprotocol/router-chain-sdk-ts");

const ROUTER_TO_SEND = "10";

const amount = {
  amount: expandDecimals(ROUTER_TO_SEND, 18).toString(),
  denom: "route",
};

const network = getEndpointsForNetwork(networkEnvironment);
const privateKeyHash = FAUCET_ACCOUNT_KEY;

/** Intializing Faucet wallet from the private key */
const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);
const alice = privateKey.toBech32();
const alice_pubkey = privateKey.toPublicKey();

const publicKey = privateKeyToPublicKeyBase64(
  Buffer.from(privateKeyHash, "hex")
);

/** Prepare the Message */
const message = MsgSend.fromJSON({
  amount,
  srcRouterAddress: alice,
  dstRouterAddress: destinationAddress,
});

/** Get Faucet Accounts details */
const aliceAccount = await new ChainRestAuthApi(
  network.lcdEndpoint
).fetchAccount(alice);

/** Create Raw Transaction */
const { signBytes, txRaw } = createTransaction({
  message: message.toDirectSign(),
  memo: "",
  fee: DEFAULT_STD_FEE,
  pubKey: publicKey,
  sequence: parseInt(aliceAccount.account.base_account.sequence, 10),
  accountNumber: parseInt(
    aliceAccount.account.base_account.account_number,
    10
  ),
  chainId: devnetChainInfo.chainId,
});

/** Sign transaction */
const signature = await privateKey.sign(signBytes);

/** Append Signatures */
txRaw.setSignaturesList([signature]);

const txService = new TxRestClient(network.lcdEndpoint);

/** Broadcast transaction */
const txResponse = await txService.broadcast(txRaw);

console.log(
  `Broadcasted transaction hash: ${JSON.stringify(txResponse.txhash)}`
);

```

Given below is an example of how `MsgStoreCode` can be used to upload a wasm contract file to router chain - 

```jsx
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
	Buffer.from(privateKeyHash, "hex")
);

const restClient = new TxRestClient(network.lcdEndpoint);

/** Get Faucet Accounts details */
  const aliceAccount = await new ChainRestAuthApi(
    network.lcdEndpoint
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

With `MsgInstantiateContract` we can instantiate the deployed contract with `codeId` -  

```jsx
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
	Buffer.from(privateKeyHash, "hex")
);

const restClient = new TxRestClient(network.lcdEndpoint);
const aliceAccount = await new ChainRestAuthApi(
		network.lcdEndpoint
	).fetchAccount(alice);
	console.log(`aliceAccount => ${JSON.stringify(aliceAccount)}`);

	const intantiateContractMsg = MsgInstantiateContract.fromJSON({
		sender: alice,
		admin: alice,
		codeId: deployedContract.codeId,
		label: "Mayank! Hello World",
		msg: {},
	});

	const instantiateTx = createTransaction({
		message: intantiateContractMsg.toDirectSign(),
		memo: "",
		fee: {
			amount: [
				{
					amount: new BigNumberInBase(4000000000).times(500000000).toString(),
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
	const signature = await privateKey.sign(instantiateTx.signBytes);

	/** Append Signatures */
	instantiateTx.txRaw.setSignaturesList([signature]);
	const txService = new TxGrpcClient(network.grpcEndpoint);

	/** Broadcast transaction */
	const txResponse = await restClient.broadcast(instantiateTx.txRaw);
	console.log(
		`Broadcasted Instantiate transaction hash: ${JSON.stringify(
			txResponse.txhash
		)}`
	);``
	const parsedLogs = logs.parseRawLog(txResponse1.raw_log);
	const contractAddressAttr = logs.findAttribute(
		parsedLogs,
		"instantiate",
		"_contract_address"
	);
	console.log(`Deployed contract address =>`, contractAddressAttr);
```

Query any contract on Router Chain with these functions - 

```jsx
import { toUtf8, ChainGrpcWasmApi, getEndpointsForNetwork, getNetworkType, ChainGrpcBankApi } from "../../router-chain-ts-sdk/src";

const network = getEndpointsForNetwork(getNetworkType("devnet"));

const wasmClient = new ChainGrpcWasmApi(network.grpcEndpoint);
const bankClient = new ChainGrpcBankApi(network.grpcEndpoint);
const request = {
address: "router1aaf9r6s7nxhysuegqrxv0wpm27ypyv4886medd3mrkrw6t4yfcns8a2l0y",
queryData: toUtf8(JSON.stringify({fetch_white_listed_contract: {},})),
};
const fetchRawContractStateResult = await wasmClient.fetchRawContractState(
request.address,
request.queryData
);
console.log("fetchRawContractState DATA =>", fetchRawContractStateResult);

const fetchContractCodeResult = await wasmClient.fetchContractCode(7);
console.log("fetchContractCodeResult =>", fetchContractCodeResult);

const fetchContractCodesResult = await wasmClient.fetchContractCodes();
console.log("fetchContractCodesResult =>", fetchContractCodesResult);

const fetchContractCodeContractsResult = await wasmClient.fetchContractCodeContracts(7);
console.log("fetchContractCodeContractsResult =>", fetchContractCodeContractsResult);

const fetchContractHistoryResult = await wasmClient.fetchContractHistory(
request.address
);
console.log("fetchContractHistoryResult =>", fetchContractHistoryResult);

const fetchContractInfoResult = await wasmClient.fetchContractInfo(
request.address
);
console.log("fetchContractInfoResult =>", fetchContractInfoResult);

const fetchSmartContractStateResult = await wasmClient.fetchSmartContractState(
request.address,
request.queryData
);
console.log("fetchSmartContractStateResult =>", fetchSmartContractStateResult);

const fetchBalanceResult = await bankClient.fetchBalance({
accountAddress: "router1m0s0544sgdczf2sm6l8v6py7rrpr8a2cvnjezx",
denom: "route",
});
console.log("fetchBalanceResult =>", fetchBalanceResult);
```

With `MsgExecuteContract` you can execute any query on Router Chain - 

```jsx
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
} from "../../router-chain-ts-sdk/src/";
import { sha256 } from "@cosmjs/crypto";
import { logs } from "@cosmjs/stargate";
import pako from "pako";
import _m0 from "protobufjs/minimal";
import { MsgExecuteContract } from "@routerprotocol/router-chain-sdk-ts";

const privateKey = PrivateKey.fromPrivateKey(privateKeyHash);

const alice = privateKey.toBech32();
const alice_pubkey = privateKey.toPublicKey();

const publicKey = privateKeyToPublicKeyBase64(
	Buffer.from(privateKeyHash, "hex")
);
const restClient = new TxRestClient(network.lcdEndpoint);

/** Get Faucet Accounts details */
	const aliceAccount = await new ChainRestAuthApi(
		network.lcdEndpoint
	).fetchAccount(alice);

	const executeContractMsg = MsgExecuteContract.fromJSON({
		sender: alice,
		action: "white_list_application_contract",
		contractAddress:
			"router1aaf9r6s7nxhysuegqrxv0wpm27ypyv4886medd3mrkrw6t4yfcns8a2l0y",
		msg: {
				chain_id: "80001",
				chain_type: 0,
				contract_address: [
					171, 132, 131, 246, 77, 156, 109, 30, 207, 155, 132, 154, 230, 119,
					221, 51, 21, 131, 92, 178,
				],
			},
	});

	const { signBytes, txRaw } = createTransaction({
		message: executeContractMsg.toDirectSign(),
		memo: "",
		fee: {
			amount: [
				{
					amount: new BigNumberInBase(4000000000).times(500000000).toString(),
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
	let txResponse = await restClient.waitTxBroadcast(txxResponse.txhash);
	console.log(`txResponse =>`,(txResponse));
```