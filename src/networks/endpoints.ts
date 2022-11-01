import { NetworkEndpoints } from './types'

export const urlEndpointsMainnet: NetworkEndpoints = {
  explorerGql: 'https://alpha-explorer-api.routerprotocol.com//gql/query',
  lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
  grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
};

export const urlEndpointsTestnet: NetworkEndpoints = {
  explorerGql: 'https://alpha-explorer-api.routerprotocol.com//gql/query',
  lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
  grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
};

export const urlEndpointsDevnet: NetworkEndpoints = {
         explorerGql: 'https://alpha-explorer-api.routerprotocol.com/gql/query',
         lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
       };

export const urlEndpointsLocal: NetworkEndpoints = {
  explorerGql: 'http://127.0.0.1:3000/gql/query',
  lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
  grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
};

export const urlEndpointsDocker: NetworkEndpoints = {
  explorerGql: 'http://host.docker.internal:3000/gql/query',
  lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
  grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
};
