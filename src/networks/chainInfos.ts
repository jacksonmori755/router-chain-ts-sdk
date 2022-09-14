import { ChainInfo } from './types'

export const mainnetChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-1',
  env: 'mainnet',
}

export const testnetChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-888',
  env: 'testnet',
}

export const devnetChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-777',
  env: 'devnet',
}

export const localChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-1',
  env: 'local',
}
