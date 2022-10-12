import { bech32 } from 'bech32';
import { Address } from 'ethereumjs-util';

export const ROUTER_CHAIN_PREFIX = 'router';

const CURRENT_CHAIN_PREFIX = ROUTER_CHAIN_PREFIX;

export const getRouterAddress = (address: string): string => {
  const addressBuffer = Address.fromString(address.toString()).toBuffer();

  return bech32.encode(CURRENT_CHAIN_PREFIX, bech32.toWords(addressBuffer));
};

export const getAddressFromRouterAddress = (address: string): string => {
  if (address.startsWith('0x')) {
    return address;
  }

  return `0x${Buffer.from(
    bech32.fromWords(bech32.decode(address).words)
  ).toString('hex')}`;
};

export const isValidAddress = (address: string) => {
  try {
    const decoded = bech32.decode(address).words;
    return !!decoded;
  } catch {
    return false;
  }
};

export const validatorToDelegatorAddress = (address: string) => {
  const decode = bech32.decode(address).words;
  return bech32.encode(CURRENT_CHAIN_PREFIX, decode);
};
