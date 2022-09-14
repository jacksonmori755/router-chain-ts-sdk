import { ComposerResponse, Web3GatewayMessage } from '../ts-types';
import snakeCaseKeys from 'snakecase-keys';
import { Coin as GrpcCoin } from '@routerprotocol/chain-api/cosmos/base/v1beta1/coin_pb';
import { Coin } from '../ts-types';

export const sleep = (timeout: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, timeout));

// dexport const isServerSide = () => true;
export const isServerSide = () => typeof window === 'undefined';

export const getWeb3GatewayMessage = <T>(
  message: T,
  type: string
): Web3GatewayMessage<T> =>
  ({
    //@ts-ignore
    ...snakeCaseKeys(message),
    '@type': type,
  } as Web3GatewayMessage<T>);

export const mapMultipleComposerResponseMessages = <T, R>(
  messages: ComposerResponse<T, R>[]
) =>
  messages.reduce(
    (
      messages: {
        web3GatewayMessage: R[];
        directBroadcastMessage: { type: string; message: T }[];
      },
      message
    ) => {
      const web3GatewayMessage = Array.isArray(message.web3GatewayMessage)
        ? message.web3GatewayMessage
        : [message.web3GatewayMessage];

      const directBroadcastMessage = Array.isArray(
        message.directBroadcastMessage
      )
        ? message.directBroadcastMessage
        : [message.directBroadcastMessage];

      return {
        web3GatewayMessage: [
          ...messages.web3GatewayMessage,
          ...web3GatewayMessage,
        ],
        directBroadcastMessage: [
          ...messages.directBroadcastMessage,
          ...directBroadcastMessage,
        ],
      };
    },
    {
      web3GatewayMessage: [] as R[],
      directBroadcastMessage: [] as { type: string; message: T }[],
    }
  );

export const objectToJson = (
         object: Record<string, any>,
         params?:
           | {
               replacer?: any;
               indentation?: number;
             }
           | undefined
       ): string => {
         const { replacer, indentation } = params || {
           replacer: null,
           indentation: 2,
         };

         return JSON.stringify(object, replacer, indentation);
       };

export const protoObjectToJson = (
         object: any,
         params?:
           | {
               replacer?: any;
               indentation?: number;
             }
           | undefined
       ): string => {
         const { replacer, indentation } = params || {
           replacer: null,
           indentation: 2,
         };

         if (object.toObject !== undefined) {
           return JSON.stringify(object.toObject(), replacer, indentation);
         }

         return objectToJson(object, { replacer, indentation });
       };

export const grpcCoinToUiCoin = (coin: GrpcCoin): Coin => ({
         amount: coin.getAmount(),
         denom: coin.getDenom(),
       });

export const uint8ArrayToString = (
         string: string | Uint8Array | null | undefined
       ): string => {
         if (!string) {
           return '';
         }

         if (string.constructor !== Uint8Array) {
           return string as string;
         }

         // TODO: uncomment
         // return new TextDecoder().decode(string)
         return '';
       };
