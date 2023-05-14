import { GeneralException } from '../exceptions';
import {
  ChainId,
  CosmosChainId,
  DevnetCosmosChainId,
  EthereumChainId,
  TestnetCosmosChainId,
} from '../ts-types';
import {
  alphaDevnetChainInfo,
  devnetChainInfo,
  dockerChainInfo,
  internalDevnetChainInfo,
  localChainInfo,
  mainnetChainInfo,
  testnetChainInfo,
} from './chainInfos';
import {
  urlEndpointsMainnet,
  urlEndpointsLocal,
  urlEndpointsTestnet,
  urlEndpointsDevnet,
  urlEndpointsDocker,
  urlEndpointsAlphaDevnet,
  urlEndpointsInternalDevnet,
} from './endpoints';
import { ChainInfo, getNetworkType, Network, NetworkEndpoints } from './types';

/**
 * @hidden
 * Supported network endpoints for Router chain. Also see {@link Network} for network names.
 * 
 * @example
 * const endpoint =  networkEndpoints["alpha-devnet"]; // here, 'alpha-devnet' is network name
 * 
 * @group Network
 */
 const NETWORK_ENDPOINT: Record<Network, NetworkEndpoints> = {
  [Network.Mainnet]: urlEndpointsMainnet,
  [Network.Devnet]: urlEndpointsDevnet,
  [Network.Testnet]: urlEndpointsTestnet,
  [Network.Local]: urlEndpointsLocal,
  [Network.Docker]: urlEndpointsDocker,
  [Network.AlphaDevnet]: urlEndpointsAlphaDevnet,
  [Network.InternalDevnet]: urlEndpointsInternalDevnet,
};

/**
 * @hidden
 * Supported Router chain info.
 * 
 * @group Network
 */
const CHAIN_INFO: Record<Network, ChainInfo> = {
  [Network.Mainnet]: mainnetChainInfo,
  [Network.Devnet]: devnetChainInfo,
  [Network.Testnet]: testnetChainInfo,
  [Network.Local]: localChainInfo,
  [Network.Docker]: dockerChainInfo,
  [Network.AlphaDevnet]: alphaDevnetChainInfo,
  [Network.InternalDevnet]: internalDevnetChainInfo,
};

const ETH_CHAINID: Record<Network, EthereumChainId> = {
  [Network.Mainnet]: EthereumChainId.MainnetEvm,
  [Network.Devnet]: EthereumChainId.DevnetEvm,
  [Network.Testnet]: EthereumChainId.TestnetEvm,
  [Network.Local]: EthereumChainId.LocalEvm,
  [Network.Docker]: EthereumChainId.Goerli,
  [Network.AlphaDevnet]: EthereumChainId.AlphaDevnetEvm,
  [Network.InternalDevnet]: EthereumChainId.AlphaDevnetEvm,
};

/**
 * Get endpoint object for a network. Also see {@link Network} for different networks on Router chain.
 * 
 * @example
 * const endpoint =  getEndpointsForNetwork(Network.devnet);
 * 
 * @group Network
 */
export const getEndpointsForNetwork = (network: Network): NetworkEndpoints =>
  NETWORK_ENDPOINT[network];

export const getChainInfoForNetwork = (network: Network): ChainInfo =>
  CHAIN_INFO[network];

export const getEthereumChainIdForNetwork = (
  network: Network
): EthereumChainId => ETH_CHAINID[network];

export const getNetworkInfo = (
         network: Network
       ): ChainInfo & NetworkEndpoints => ({
         ...CHAIN_INFO[network],
         ...NETWORK_ENDPOINT[network],
       });

export const getEndpointsFromChainId = (
  chainId: TestnetCosmosChainId | CosmosChainId | ChainId | DevnetCosmosChainId
): { rpc: string; rest: string } => {
  switch (chainId) {
    case CosmosChainId.Router:
      return {
        rpc: getEndpointsForNetwork(getNetworkType('mainnet')).tmEndpoint,
        rest: getEndpointsForNetwork(getNetworkType('mainnet')).lcdEndpoint,
      };
    case TestnetCosmosChainId.Router:
      return {
        rpc: getEndpointsForNetwork(getNetworkType('testnet')).tmEndpoint,
        rest: getEndpointsForNetwork(getNetworkType('testnet')).lcdEndpoint,
      };
    case DevnetCosmosChainId.Router:
      return {
        rpc: getEndpointsForNetwork(getNetworkType('devnet')).tmEndpoint,
        rest: getEndpointsForNetwork(getNetworkType('devnet')).lcdEndpoint,
      };
    case CosmosChainId.Cosmoshub:
      return {
        rpc: 'https://tm.cosmos.injective.network',
        rest: 'https://lcd.cosmos.injective.network',
      };
    case CosmosChainId.Osmosis:
      return {
        rpc: 'https://tm.osmosis.injective.network',
        rest: 'https://lcd.osmosis.injective.network',
      };
    case CosmosChainId.Juno:
      return {
        rpc: 'https://tm.juno.injective.network',
        rest: 'https://lcd.juno.injective.network',
      };
    case CosmosChainId.Terra:
      return {
        rpc: 'https://tm.terra.injective.network',
        rest: 'https://lcd.terra.injective.network',
      };
    case CosmosChainId.TerraUST:
      return {
        rpc: 'https://tm.terra.injective.network',
        rest: 'https://lcd.terra.injective.network',
      };
    case CosmosChainId.Axelar:
      return {
        rpc: 'https://tm.axelar.injective.network',
        rest: 'https://lcd.axelar.injective.network',
      };
    case CosmosChainId.Evmos:
      return {
        rpc: 'https://tm.evmos.injective.network',
        rest: 'https://lcd.evmos.injective.network',
      };
    case CosmosChainId.Persistence:
      return {
        rpc: 'https://tm.persistence.injective.network',
        rest: 'https://lcd.persistence.injective.network',
      };
    case CosmosChainId.Secret:
      return {
        rpc: 'https://tm.secret.injective.network',
        rest: 'https://lcd.secret.injective.network',
      };
    case CosmosChainId.Chihuahua:
      return {
        rpc: 'https://rpc.chihuahua.wtf',
        rest: 'https://api.chihuahua.wtf',
      };
    case TestnetCosmosChainId.Cosmoshub:
      return {
        rpc: 'https://testnet.tm.cosmos.injective.dev',
        rest: 'https://testnet.lcd.cosmos.injective.dev',
      };
    default:
      throw new GeneralException(
        new Error(`Endpoints for ${chainId} not found`)
      );
  }
};
