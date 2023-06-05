import { MsgCwStoreCode as BaseMsgCwStoreCode } from '@routerprotocol/chain-api/routerchain/rwasm/tx_pb';
import { MsgBase } from '../../MsgBase';
import snakeCaseKeys from 'snakecase-keys';
//import { fromUtf8 } from '../../../utils';

export declare namespace MsgCwStoreCode {
  export interface Params {
    sender: string;
    wasm: Buffer;
    amount?: {
      denom: string;
      amount: string;
    };
    instantiatePermission?: number;
  }

  export interface DirectSign {
    type: '/routerprotocol.routerchain.rwasm.MsgCwStoreCode';
    message: BaseMsgCwStoreCode;
  }

  export interface Data extends BaseMsgCwStoreCode.AsObject {
    '@type': '/routerprotocol.routerchain.rwasm.MsgCwStoreCode';
  }

  export interface Amino extends BaseMsgCwStoreCode.AsObject {
    type: 'rwasm/CwStoreCode';
  }

  export interface Web3 extends BaseMsgCwStoreCode.AsObject {
    '@type': '/routerprotocol.routerchain.rwasm.MsgCwStoreCode';
  }

  export type Proto = BaseMsgCwStoreCode;
}

/**
 * @group Message
 */
export default class MsgCwStoreCode extends MsgBase<
  MsgCwStoreCode.Params,
  MsgCwStoreCode.Data,
  MsgCwStoreCode.Proto,
  MsgCwStoreCode.Amino,
  MsgCwStoreCode.DirectSign
> {
  /**
   *
   * @param params
   * @returns
   */
  static fromJSON(params: MsgCwStoreCode.Params): MsgCwStoreCode {
    return new MsgCwStoreCode(params);
  }

  /**
   *
   * @returns
   */
  public toProto(): MsgCwStoreCode.Proto {
    const { params } = this;

    const message = new BaseMsgCwStoreCode();
    //message.setExtension()
    //message.setInstantiatePermission();
    message.setWasmByteCode(params.wasm.toString('base64'));
    message.setSender(params.sender);

    // if (params.amount) {
    //   const funds = new Coin();

    //   funds.setAmount(params.amount.amount);
    //   funds.setDenom(params.amount.denom);

    //   //message.setFundsList([funds]);
    // }

    return message;
  }

  /**
   *
   * @returns
   */
  public toData(): MsgCwStoreCode.Data {
    const proto = this.toProto();

    return {
      '@type': '/routerprotocol.routerchain.rwasm.MsgCwStoreCode',
      ...proto.toObject(),
    };
  }

  /**
   *
   * @returns
   */
  public toAmino(): MsgCwStoreCode.Amino {
    const proto = this.toProto();
    const message = {
      ...snakeCaseKeys(proto.toObject()),
    };

    const messageWithProperKeys = snakeCaseKeys(message);

    return ({
      type: 'rwasm/CwStoreCode',
      ...messageWithProperKeys,
    } as unknown) as MsgCwStoreCode.Amino;
  }

  /**
   *
   * @returns
   */
  public toWeb3(): MsgCwStoreCode.Web3 {
    const amino = this.toAmino();
    const { type, ...rest } = amino;

    return ({
      '@type': '/routerprotocol.routerchain.rwasm.MsgCwStoreCode',
      ...rest,
    } as unknown) as MsgCwStoreCode.Web3;
  }

  /**
   *
   * @returns
   */
  public toDirectSign(): MsgCwStoreCode.DirectSign {
    const proto = this.toProto();

    return {
      type: '/routerprotocol.routerchain.rwasm.MsgCwStoreCode',
      message: proto,
    };
  }
}
