import { ethers } from 'ethers';

export const getRequestMetadataWithoutAck = (destGasLimit: number): string => {
  return ethers.utils.solidityPack(
    [
      'uint64',
      'uint64',
      'uint64',
      'uint64',
      'uint128',
      'uint8',
      'bool',
      'string',
    ],
    [destGasLimit, 0, 0, 0, 0, 0, false, '']
  );
};

export const getRequestMetadataWitAck = (
  destGasLimit: number,
  ackType: number,
  ackGasLimit: number
): string => {
  return ethers.utils.solidityPack(
    [
      'uint64',
      'uint64',
      'uint64',
      'uint64',
      'uint128',
      'uint8',
      'bool',
      'string',
    ],
    [destGasLimit, 0, ackGasLimit, 0, 0, ackType, false, '']
  );
};

export const getRequestMetadata = (
  destGasLimit: number,
  destGasPrice: number,
  ackGasLimit: number,
  ackGasPrice: number,
  relayerFees: number,
  ackType: number,
  isReadCall: boolean,
  asmAddress: string
): string => {
  return ethers.utils.solidityPack(
    [
      'uint64',
      'uint64',
      'uint64',
      'uint64',
      'uint128',
      'uint8',
      'bool',
      'string',
    ],
    [
      destGasLimit,
      destGasPrice,
      ackGasLimit,
      ackGasPrice,
      relayerFees,
      ackType,
      isReadCall,
      asmAddress,
    ]
  );
};
