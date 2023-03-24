import { Coin } from '@routerprotocol/chain-api/cosmos/base/v1beta1/coin_pb';
import { MsgStoreCode as BaseMsgStoreCode } from '@routerprotocol/chain-api/cosmwasm/wasm/v1/tx_pb';
import { MsgBase } from '../../MsgBase';
import snakeCaseKeys from 'snakecase-keys';

export declare namespace MsgStoreCode {
  export interface Params {
    sender: string;
    wasm: string | Uint8Array;
    amount?: {
      denom: string;
      amount: string;
    };
    instantiatePermission?: number;
  }

  export interface DirectSign {
    type: '/cosmwasm.wasm.v1.MsgStoreCode';
    message: BaseMsgStoreCode;
  }

  export interface Data extends BaseMsgStoreCode.AsObject {
    '@type': '/cosmwasm.wasm.v1.MsgStoreCode';
  }

  export interface Amino extends BaseMsgStoreCode.AsObject {
    type: 'wasm/MsgStoreCode';
  }

  export interface Web3 extends BaseMsgStoreCode.AsObject {
    '@type': '/cosmwasm.wasm.v1.MsgStoreCode';
  }

  export type Proto = BaseMsgStoreCode;
}

/**
 * @group Message
 */
export default class MsgStoreCode extends MsgBase<
  MsgStoreCode.Params,
  MsgStoreCode.Data,
  MsgStoreCode.Proto,
  MsgStoreCode.Amino,
  MsgStoreCode.DirectSign
> {

  /**
   * 
   * @param params 
   * @returns 
   */
  static fromJSON(params: MsgStoreCode.Params): MsgStoreCode {
    return new MsgStoreCode(params);
  }

  /**
   * 
   * @returns 
   */
  public toProto(): MsgStoreCode.Proto {
    const { params } = this;

    const message = new BaseMsgStoreCode();
    //message.setExtension()
    message.setInstantiatePermission();
    message.setWasmByteCode(params.wasm);
    message.setSender(params.sender);

    if (params.amount) {
      const funds = new Coin();

      funds.setAmount(params.amount.amount);
      funds.setDenom(params.amount.denom);

      //message.setFundsList([funds]);
    }

    return message;
  }

  /**
   * 
   * @returns 
   */
  public toData(): MsgStoreCode.Data {
    const proto = this.toProto();

    return {
      '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
      ...proto.toObject(),
    };
  }

  /**
   * 
   * @returns 
   */
  public toAmino(): MsgStoreCode.Amino {
    const proto = this.toProto();
    const message = {
      ...snakeCaseKeys(proto.toObject()),
    };

    const messageWithProperKeys = snakeCaseKeys(message);

    return ({
      type: 'wasm/MsgStoreCode',
      ...messageWithProperKeys,
    } as unknown) as MsgStoreCode.Amino;
  }

  /**
   * 
   * @returns 
   */
  public toWeb3(): MsgStoreCode.Web3 {
    const amino = this.toAmino();
    const { type, ...rest } = amino;

    return ({
      '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
      ...rest,
    } as unknown) as MsgStoreCode.Web3;
  }

  /**
   * 
   * @returns 
   */
  public toDirectSign(): MsgStoreCode.DirectSign {
    const proto = this.toProto();

    return {
      type: '/cosmwasm.wasm.v1.MsgStoreCode',
      message: proto,
    };
  }
}
