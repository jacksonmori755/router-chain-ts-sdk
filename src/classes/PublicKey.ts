import { BECH32_PUBKEY_ACC_PREFIX } from '../utils';
import { bech32 } from 'bech32';
import { PubKey } from '@routerprotocol/chain-api/crypto/ethsecp256k1/keys_pb';
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import { toBuffer } from 'ethereumjs-util';
import secp256k1, { publicKeyConvert } from 'secp256k1';
import { Address } from './Address';
import { keccak256 } from 'js-sha3';
/**
 * @category Crypto Utility Classes
 */
function addLeading0x(str: string) {
  if (!str.startsWith('0x')) return '0x' + str;
  else return str;
}

function uint8ArrayToHex(arr: Uint8Array) {
  return Buffer.from(arr).toString('hex');
}

function hexToUnit8Array(str: string) {
  return new Uint8Array(Buffer.from(str, 'hex'));
}

function decompress(startsWith02Or03: string) {
  // if already decompressed an not has trailing 04
  const testBuffer = Buffer.from(startsWith02Or03, 'hex');
  if (testBuffer.length === 64) startsWith02Or03 = '04' + startsWith02Or03;

  let decompressed = uint8ArrayToHex(
    publicKeyConvert(hexToUnit8Array(startsWith02Or03), false)
  );

  // remove trailing 04
  decompressed = decompressed.substring(2);
  return decompressed;
}

export class PublicKey {
  private type: string;

  private key: Uint8Array;

  private constructor(key: Uint8Array, type?: string) {
    this.key = key;
    this.type =
      type || '/routerprotocol.routerchain.crypto.ethsecp256k1.PubKey';
  }

  static fromBase64(publicKey: string): PublicKey {
    return new PublicKey(Buffer.from(publicKey, 'base64'));
  }

  static fromHex(privateKey: string): PublicKey {
    const isString = typeof privateKey === 'string';
    const privateKeyHex =
      isString && privateKey.startsWith('0x')
        ? privateKey.slice(2)
        : privateKey;
    const privateKeyBuff = Buffer.from(privateKeyHex.toString(), 'hex');
    const publicKeyByte = secp256k1.publicKeyCreate(privateKeyBuff, true);
    const type = '/routerprotocol.routerchain.crypto.ethsecp256k1.PubKey';

    return new PublicKey(publicKeyByte, type);
  }

  public toPubKeyBytes(): Uint8Array {
    return this.key;
  }

  public toBase64(): string {
    return Buffer.from(this.toPubKeyBytes()).toString('base64');
  }

  public toHex(): string {
    return Buffer.from(this.toPubKeyBytes()).toString('hex');
  }

  public toBech32(): string {
    return bech32.encode(BECH32_PUBKEY_ACC_PREFIX, this.key);
  }

  public toAddress(): Address {
    const publicKeyHex = this.toHex();
    const decompressedPublicKey = decompress(publicKeyHex);
    const addressBuffer = Buffer.from(
      keccak256(toBuffer(addLeading0x(decompressedPublicKey))),
      'hex'
    ).subarray(-20);

    return Address.fromHex(addressBuffer.toString('hex').toLowerCase());
  }

  public toProto() {
    const proto = new PubKey();
    proto.setKey(this.key);

    return proto;
  }

  public toAny() {
    const proto = this.toProto();

    const message = new Any();
    message.setTypeUrl(this.type);
    message.setValue(Buffer.from(proto.serializeBinary()).toString('base64'));

    return message;
  }
}
