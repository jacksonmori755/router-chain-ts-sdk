import { TextEncoder, TextDecoder } from 'text-encoding';

export function toUtf8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export function fromUtf8(data: Uint8Array): string {
  return new TextDecoder('utf-8').decode(data);
}

export function toBase64(data: Record<string, any>): string {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

export function fromBase64(payload: string): Record<string, any> {
  return JSON.parse(Buffer.from(payload, 'base64').toString());
}

export const encodeStringToBase64 = (data: string) => {
  if (data.startsWith('0x')) {
    return hexToBase64String(data);
  }
  return Buffer.from(data).toString('base64');
};
export const encodeBase64ToString = (data: string) => {
  return Buffer.from(data, 'base64').toString('ascii');
};

export const hexToBase64String = (hexString: string) => {
  hexString = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
  return Buffer.from(hexString, 'hex').toString('base64');
};

export const base64ToHexString = (base64String: string) => {
  return Buffer.from(base64String, 'base64').toString('hex');
};

