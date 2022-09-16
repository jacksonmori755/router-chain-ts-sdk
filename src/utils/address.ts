import { bech32 } from 'bech32';
import { Address } from 'ethereumjs-util';

export const getRouterAddress = (address: string): string => {
  const addressBuffer = Address.fromString(address.toString()).toBuffer();

  return bech32.encode('router', bech32.toWords(addressBuffer));
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
