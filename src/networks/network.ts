import {
  devnetChainInfo,
  localChainInfo,
  mainnetChainInfo,
  testnetChainInfo,
} from './chainInfos'
import {
  urlEndpointsMainnet,
  urlEndpointsLocal,
  urlEndpointsTestnet,
  urlEndpointsDevnet,
} from './endpoints';
import { ChainInfo, Network, NetworkEndpoints } from './types'

export const networkEndpoints: Record<Network, NetworkEndpoints> = {
  [Network.Mainnet]: urlEndpointsMainnet,
  [Network.Devnet]: urlEndpointsDevnet,
  [Network.Testnet]: urlEndpointsTestnet,
  [Network.Local]: urlEndpointsLocal,
};

export const chainInfos: Record<Network, ChainInfo> = {
  [Network.Mainnet]: mainnetChainInfo,
  [Network.Devnet]: devnetChainInfo,
  [Network.Testnet]: testnetChainInfo,
  [Network.Local]: localChainInfo,
};

export const getUrlEndpointForNetwork = (network: Network): NetworkEndpoints =>
  networkEndpoints[network]

export const getEndpointsForNetwork = (network: Network): NetworkEndpoints =>
  networkEndpoints[network]

export const getChainInfoForNetwork = (network: Network): ChainInfo =>
  chainInfos[network]

export const getNetworkInfo = (
  network: Network,
): ChainInfo & NetworkEndpoints => ({
  ...chainInfos[network],
  ...networkEndpoints[network],
})
