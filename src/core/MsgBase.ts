import snakecaseKeys from 'snakecase-keys'
import { objectKeysToEip712Types, TypedDataField } from './eip712'
import { prepareSignBytes } from './utils'

/**
 * @group Message
 */
export abstract class MsgBase<
  Params,
  DataRepresentation,
  ProtoRepresentation,
  AminoRepresentation,
  DirectSignRepresentation,
> {
  params: Params

  constructor(params: Params) {
    this.params = params
  }

  public abstract toDirectSign(): DirectSignRepresentation

  public abstract toData(): DataRepresentation

  public abstract toProto(): ProtoRepresentation

  public abstract toAmino(): AminoRepresentation

  public abstract toWeb3(): Omit<AminoRepresentation, 'type'> & {
    '@type': string
  }

  public toJSON(): string {
    return JSON.stringify(prepareSignBytes(this.toData()))
  }

  public toEip712Types(): Map<string, TypedDataField[]> {
    return objectKeysToEip712Types(this.toAmino() as Record<string, any>)
  }

  public toEip712(): {
    type: string
    value: Omit<AminoRepresentation, 'type'>
  } {
    const amino = this.toAmino()
    console.log('SDK Amino =>', amino);
    console.log('SDK Amino =>', JSON.stringify(amino));
    // @ts-ignore
    const { type, ...value } = amino
    console.log('SDK snakecaseKeys(value) from amino =>', snakecaseKeys(value));
    console.log(
      'SDK snakecaseKeys(value) from amino =>',
      JSON.stringify(snakecaseKeys(value))
    );
    return {
      type: type as string,
      value: snakecaseKeys(value) as Omit<AminoRepresentation, 'type'>,
    }
  }

  public toDirectSignJSON(): string {
    return JSON.stringify(prepareSignBytes(this.toDirectSign()))
  }
}
