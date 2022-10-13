import { ChainConfigurationtype, ChainInfo } from './types';

export const mainnetChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-1',
  env: 'mainnet',
};

export const testnetChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-888',
  env: 'testnet',
};

export const devnetChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-777',
  env: 'devnet',
};

export const localChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-1',
  env: 'local',
};

export const dockerChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-1',
  env: 'docker',
};

export enum ChainType {
  EVM = 'CHAIN_TYPE_EVM',
}

export const ChainTypes = [ChainType.EVM];

export const ChainIdByChainType: {
  [key: string]: ChainConfigurationtype[];
} = {
  [ChainType.EVM]: [
    {
      chainId: '80001',
      name: 'Matic Testnet',
    },
    {
      chainId: '1',
      name: 'Georli',
    },
  ],
};
