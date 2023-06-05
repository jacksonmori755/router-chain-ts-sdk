import { EthereumChainId } from '../../ts-types';
import { Msgs } from '../msgs';
import { Eip712ConvertFeeArgs, Eip712ConvertTxArgs } from './types';
import {
  getDefaultEip712Types,
  getEip712Domain,
  getEipTxDetails,
  getEip712Fee,
  getTypesIncludingFeePayer,
} from './utils';

export const getEip712TypedData = ({
         msgs,
         tx,
         fee,
         ethereumChainId,
       }: {
         msgs: Msgs | Msgs[];
         tx: Eip712ConvertTxArgs;
         fee?: Eip712ConvertFeeArgs;
         ethereumChainId: EthereumChainId;
       }) => {
         const messages = Array.isArray(msgs) ? msgs : [msgs];
         const eip712Msgs = messages.map(m => m.toEip712());
         const eip712MessageTypes = messages[0].toEip712Types();

         const types = getDefaultEip712Types();
         const typesWithMessageTypes = {
           types: {
             ...types.types,
             ...Object.fromEntries(eip712MessageTypes),
           },
         };
         const typesWithFeePayer = getTypesIncludingFeePayer({
           fee,
           types: typesWithMessageTypes,
         });
         //    types: {
         //      EIP712Domain: [
         //        {
         //          name: 'name',
         //          type: 'string',
         //        },
         //        {
         //          name: 'version',
         //          type: 'string',
         //        },
         //        {
         //          name: 'chainId',
         //          type: 'uint256',
         //        },
         //        {
         //          name: 'verifyingContract',
         //          type: 'string',
         //        },
         //        {
         //          name: 'salt',
         //          type: 'string',
         //        },
         //      ],
         //      Tx: [
         //        {
         //          name: 'account_number',
         //          type: 'string',
         //        },
         //        {
         //          name: 'chain_id',
         //          type: 'string',
         //        },
         //        {
         //          name: 'fee',
         //          type: 'Fee',
         //        },
         //        {
         //          name: 'memo',
         //          type: 'string',
         //        },
         //        {
         //          name: 'msgs',
         //          type: 'Msg[]',
         //        },
         //        {
         //          name: 'sequence',
         //          type: 'string',
         //        },
         //      ],
         //      Fee: [
         //        {
         //          name: 'feePayer',
         //          type: 'string',
         //        },
         //        {
         //          name: 'amount',
         //          type: 'Coin[]',
         //        },
         //        {
         //          name: 'gas',
         //          type: 'string',
         //        },
         //      ],
         //      Coin: [
         //        {
         //          name: 'denom',
         //          type: 'string',
         //        },
         //        {
         //          name: 'amount',
         //          type: 'string',
         //        },
         //      ],
         //      Msg: [
         //        {
         //          name: 'type',
         //          type: 'string',
         //        },
         //        {
         //          name: 'value',
         //          type: 'MsgValue',
         //        },
         //      ],
         //      MsgValue: [
         //        {
         //          name: 'fee_payer',
         //          type: 'string',
         //        },
         //        //  {
         //        //    name: 'chain_type',
         //        //    type: 'uint64',
         //        //  },
         //        //  {
         //        //    name: 'chain_id',
         //        //    type: 'string',
         //        //  },
         //        { name: 'dapp_address', type: 'string' },
         //      ],
         //    },
         //  };
         return {
           primaryType: 'Tx',
           ...typesWithFeePayer,
           ...getEip712Domain(ethereumChainId),
           message: {
             ...getEipTxDetails(tx),
             ...getEip712Fee(fee),
             msgs: eip712Msgs,
           },
         };
       };
