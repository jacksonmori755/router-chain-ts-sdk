export enum Network {
  Local = 'local',
  InternalDevnet = 'internal devnet',
  AlphaDevnet = 'alpha devnet',
  Devnet = 'devnet',
  Testnet = 'testnet',
  Mainnet = 'mainnet',
  Docker = 'docker',
}

export const getNetworkType = (type: string) => {
  switch (type.toLowerCase()) {
    case 'local':
      return Network.Local;
    case 'internal devnet':
      return Network.InternalDevnet;
    case 'alpha devnet':
      return Network.AlphaDevnet;
    case 'devnet':
      return Network.Devnet;
    case 'testnet':
      return Network.Testnet;
    case 'mainnet':
      return Network.Mainnet;
    case 'docker':
      return Network.Docker;
    default:
      return Network.Devnet;
  }
};

export type NetworkEndpoints = {
  explorerGql: string;
  lcdEndpoint: string;
  grpcEndpoint: string;
  tmEndpoint: string;
};

export type UrlEndpoints = NetworkEndpoints /** Deprecated */

export type ChainInfo = { feeDenom: string; chainId: string; env: string }

export type ChainConfigurationtype = {
  name: string;
  chainId: string;
  logoURI: string;
};