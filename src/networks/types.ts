export enum Network {
  Local = 'local',
  Devnet = 'devnet',
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}

export const getNetworkType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'local':
      return Network.Local;
    case 'devnet':
      return Network.Devnet;
    case 'testnet':
      return Network.Testnet;
    case 'mainnet':
      return Network.Mainnet;
    default:
      return Network.Devnet;
  }
};

export type NetworkEndpoints = {
  explorerGql: string;
  lcdEndpoint: string;
  grpcEndpoint: string;
};

export type UrlEndpoints = NetworkEndpoints /** Deprecated */

export type ChainInfo = { feeDenom: string; chainId: string; env: string }

export type ChainConfigurationtype = {
  name: string;
  chainId: string;
};