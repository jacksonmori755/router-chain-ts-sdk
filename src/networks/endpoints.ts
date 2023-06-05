import { NetworkEndpoints } from './types';
export const urlEndpointsMainnet: NetworkEndpoints = {
         explorerGql: 'https://alpha-explorer-api.routerprotocol.com/gql/query',
         explorerGqlWs: 'wss://alpha-explorer-api.routerprotocol.com/gql/query',
         lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
         tmEndpoint: 'https://devnet-alpha.tm.routerprotocol.com',
         rpcEndpoint: 'https://devnet.evm.rpc.routerprotocol.com',
       };

export const urlEndpointsTestnet: NetworkEndpoints = {
         explorerGql: 'https://explorer-api.testnet.routerchain.dev/gql/query',
         explorerGqlWs: 'wss://explorer-api.testnet.routerchain.dev/gql/query',
         lcdEndpoint: 'https://lcd.testnet.routerchain.dev',
         grpcEndpoint: 'https://grpcweb.testnet.routerchain.dev',
         tmEndpoint: 'https://tm.rpc.testnet.routerchain.dev',
         rpcEndpoint: 'https://evm.rpc.testnet.routerchain.dev',
       };

export const urlEndpointsInternalDevnet: NetworkEndpoints = {
         explorerGql: 'https://alpha-explorer-api.routerprotocol.com/gql/query',
         explorerGqlWs: 'wss://alpha-explorer-api.routerprotocol.com/gql/query',
         lcdEndpoint: 'https://devnet-internal.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet-internal.grpcweb.routerprotocol.com',
         tmEndpoint: 'https://devnet-internal.tm.routerprotocol.com',
         rpcEndpoint: 'https://devnet-internal.evm.rpc.routerprotocol.com',
       };

export const urlEndpointsAlphaDevnet: NetworkEndpoints = {
         explorerGql: 'https://alpha-explorer-api.routerprotocol.com/gql/query',
         explorerGqlWs: 'wss://alpha-explorer-api.routerprotocol.com/gql/query',
         lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
         tmEndpoint: 'https://devnet-alpha.tm.routerprotocol.com',
         rpcEndpoint: 'https://devnet-alpha.evm.rpc.routerprotocol.com',
       };

export const urlEndpointsDevnet: NetworkEndpoints = {
         explorerGql:
           'https://devnet-explorer-api.routerprotocol.com/gql/query',
         explorerGqlWs:
           'wss://devnet-explorer-api.routerprotocol.com/gql/query',
         lcdEndpoint: 'https://devnet.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet.grpcweb.routerprotocol.com',
         tmEndpoint: 'https://devnet.tm.routerprotocol.com',
         rpcEndpoint: 'https://devnet.evm.rpc.routerprotocol.com',
       };

export const urlEndpointsLocal: NetworkEndpoints = {
         explorerGql: 'http://127.0.0.1:3000/gql/query',
         explorerGqlWs: 'ws://127.0.0.1:3000/gql/query',
         lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
         tmEndpoint: 'https://devnet-alpha.tm.routerprotocol.com',
         rpcEndpoint: 'https://devnet-alpha.evm.rpc.routerprotocol.com',
       };

export const urlEndpointsDocker: NetworkEndpoints = {
         explorerGql: 'http://host.docker.internal:3000/gql/query',
         explorerGqlWs: 'wss://host.docker.internal:3000/gql/query',
         lcdEndpoint: 'https://devnet-alpha.lcd.routerprotocol.com',
         grpcEndpoint: 'https://devnet-alpha.grpcweb.routerprotocol.com',
         tmEndpoint: 'https://devnet-alpha.tm.routerprotocol.com',
         rpcEndpoint: 'https://devnet-alpha.evm.rpc.routerprotocol.com',
       };
