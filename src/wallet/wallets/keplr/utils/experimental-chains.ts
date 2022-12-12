import { Bech32Address } from '@keplr-wallet/cosmos';
import {
  TestnetCosmosChainId,
  DevnetCosmosChainId,
  CosmosChainId,
  getEndpointsForNetwork,
  getNetworkType,
} from '../../../..';
getEndpointsForNetwork(getNetworkType('mainnet'));
export const experimentalChainsConfig = {
  [CosmosChainId.Router]: {
    rpc: getEndpointsForNetwork(getNetworkType('mainnet')).tmEndpoint,
    rest: getEndpointsForNetwork(getNetworkType('mainnet')).lcdEndpoint,
    rpcConfig: undefined,
    restConfig: undefined,
    chainId: 'router-1',
    chainName: 'Router',
    stakeCurrency: {
      coinDenom: 'ROUTER',
      coinMinimalDenom: 'router',
      coinDecimals: 18,
      coinGeckoId: 'route',
    },
    walletUrl: 'https://hub.router.network/',
    walletUrlForStaking: 'https://hub.router.network/',
    bip44: {
      coinType: 60,
    },
    bech32Config: Bech32Address.defaultBech32Config('router'),
    currencies: [
      {
        coinDenom: 'ROUTER',
        coinMinimalDenom: 'router',
        coinDecimals: 18,
        coinGeckoId: 'route',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'ROUTER',
        coinMinimalDenom: 'router',
        coinDecimals: 18,
        coinGeckoId: 'route',
        gasPriceStep: {
          low: 5000000000,
          average: 25000000000,
          high: 50000000000,
        },
      },
    ],
    features: ['ibc-transfer', 'ibc-go', 'eth-address-gen', 'eth-key-sign'],
    beta: true,
  },
  [TestnetCosmosChainId.Router]: {
    rpc: getEndpointsForNetwork(getNetworkType('testnet')).tmEndpoint,
    rest: getEndpointsForNetwork(getNetworkType('testnet')).lcdEndpoint,
    rpcConfig: undefined,
    restConfig: undefined,
    chainId: 'router-1',
    chainName: 'Router Testnet',
    stakeCurrency: {
      coinDenom: 'ROUTER',
      coinMinimalDenom: 'router',
      coinDecimals: 18,
      coinGeckoId: 'route',
    },
    walletUrl: 'https://hub.router.dev/',
    walletUrlForStaking: 'https://hub.router.dev/',
    bip44: {
      coinType: 60,
    },
    bech32Config: Bech32Address.defaultBech32Config('router'),
    currencies: [
      {
        coinDenom: 'ROUTER',
        coinMinimalDenom: 'router',
        coinDecimals: 18,
        coinGeckoId: 'route',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'ROUTER',
        coinMinimalDenom: 'router',
        coinDecimals: 18,
        coinGeckoId: 'route',
        gasPriceStep: {
          low: 5000000000,
          average: 25000000000,
          high: 40000000000,
        },
      },
    ],
    coinType: 60,
    features: ['ibc-transfer', 'ibc-go', 'eth-address-gen', 'eth-key-sign'],
  },
  [DevnetCosmosChainId.Router]: {
    rpc: getEndpointsForNetwork(getNetworkType('devnet')).tmEndpoint,
    rest: getEndpointsForNetwork(getNetworkType('devnet')).lcdEndpoint,
    rpcConfig: undefined,
    restConfig: undefined,
    chainId: 'router-1',
    chainName: 'Router - Devnet',
    stakeCurrency: {
      coinDenom: 'ROUTER',
      coinMinimalDenom: 'router',
      coinDecimals: 18,
      coinGeckoId: 'route',
    },
    walletUrl: 'https://hub.router.dev/',
    walletUrlForStaking: 'https://hub.router.dev/',
    bip44: {
      coinType: 60,
    },
    bech32Config: Bech32Address.defaultBech32Config('router'),
    currencies: [
      {
        coinDenom: 'ROUTER',
        coinMinimalDenom: 'router',
        coinDecimals: 18,
        coinGeckoId: 'route',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'ROUTER',
        coinMinimalDenom: 'router',
        coinDecimals: 18,
        coinGeckoId: 'route',
        gasPriceStep: {
          low: 5000000000,
          average: 25000000000,
          high: 40000000000,
        },
      },
    ],
    coinType: 60,
    features: ['ibc-transfer', 'ibc-go', 'eth-address-gen', 'eth-key-sign'],
  },
} as Record<string, any>;

export const getExperimentalChainConfigBasedOnChainId = (
  chainId: string
): any | undefined => experimentalChainsConfig[chainId];
