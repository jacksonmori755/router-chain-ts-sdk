import { NetworkEndpoints } from './types'

export const urlEndpointsMainnet: NetworkEndpoints = {
         explorerGql: 'http://127.0.0.1:3000/gql/query',
         lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
       };

export const urlEndpointsTestnet: NetworkEndpoints = {
         explorerGql: 'http://127.0.0.1:3000/gql/query',
         lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
       };

export const urlEndpointsDevnet: NetworkEndpoints = {
  explorerGql: 'http://13.233.183.24:3000/gql/query',
  lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
  grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
};

export const urlEndpointsLocal: NetworkEndpoints = {
  explorerGql: 'http://127.0.0.1:3000/gql/query',
  lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
  grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
};
