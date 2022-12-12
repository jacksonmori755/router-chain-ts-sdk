import { ChainConfigurationtype, ChainInfo } from './types';

export const mainnetChainInfo: ChainInfo = {
  feeDenom: 'router',
  chainId: 'router-1',
  env: 'mainnet',
};

export const testnetChainInfo: ChainInfo = {
         feeDenom: 'router',
         chainId: 'router-1',
         env: 'testnet',
       };

export const devnetChainInfo: ChainInfo = {
         feeDenom: 'router',
         chainId: 'router-1',
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
             chainId: '3',
             name: 'Ropsten',
             logoURI:
               'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023',
           },
           {
             chainId: '4',
             name: 'Rinkeby',
             logoURI:
               'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023',
           },
           {
             chainId: '5',
             name: 'Georli',
             logoURI:
               'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023',
           },
           {
             chainId: '42',
             name: 'Kovan',
             logoURI:
               'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023',
           },
           {
             chainId: '1',
             name: 'Georli',
             logoURI:
               'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=023',
           },
           {
             chainId: '80001',
             name: 'Matic Testnet',
             logoURI:
               'https://cryptologos.cc/logos/polygon-matic-logo.png?v=023',
           },
         ],
       };
