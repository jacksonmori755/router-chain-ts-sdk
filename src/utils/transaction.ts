import { fromRpcSig, ecrecover } from 'ethereumjs-util'
import { publicKeyConvert } from 'secp256k1'
import { TypedDataUtils, SignTypedDataVersion } from '@metamask/eth-sig-util'
import { utils } from 'ethers';

export const recoverTypedSignaturePubKey = (
         data: any,
         signature: string
       ): string => {
         const compressedPubKeyPrefix = Buffer.from('04', 'hex');
         const message = TypedDataUtils.eip712Hash(
           data,
           SignTypedDataVersion.V4
         );
         console.log('SDK Actual data', data);
         console.log('SDK message TypedDataUtils.eip712Hash =>', message);
         console.log(
           'SDK message TypedDataUtils.eip712Hash =>',
           JSON.stringify(message)
         );
         console.log(
           'SDK message TypedDataUtils.eip712Hash keccakhash of message =>',
           utils.keccak256(message)
         );
         console.log(
           'SDK message TypedDataUtils.eip712Hash keccakhash =>',
           utils.keccak256(utils.toUtf8Bytes(JSON.stringify(data)))
         );
         //  console.log(
         //    'SDK message TypedDataUtils.eip712Hash keccakhash =>',
         //    utils.keccak256(utils.arrayify(JSON.stringify(data)))
         //  );
         const sigParams = fromRpcSig(signature);
         console.log('SDK sigParams =>', sigParams);
         console.log(
           'SDK JSON.stringify(sigParams) =>',
           JSON.stringify(sigParams)
         );
         const publicKey = ecrecover(
           message,
           sigParams.v,
           sigParams.r,
           sigParams.s
         );
         const prefixedKey = Buffer.concat([compressedPubKeyPrefix, publicKey]);
         const compressedKey = Buffer.from(publicKeyConvert(prefixedKey));

         return `0x${compressedKey.toString('hex')}`;
       };
