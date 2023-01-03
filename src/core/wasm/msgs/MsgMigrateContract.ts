import { MsgMigrateContract as BaseMsgMigrateContract } from '@routerprotocol/chain-api/cosmwasm/wasm/v1/tx_pb';
import { MsgBase } from '../../MsgBase';
import snakeCaseKeys from 'snakecase-keys';
import { toUtf8 } from '../../../utils';

export declare namespace MsgMigrateContract {
  export interface Params {
    senderAddress: string;
    contractAddress: string;
    codeId: number;
    msg: Object;
  }

  export interface DirectSign {
    type: '/cosmwasm.wasm.v1.MsgMigrateContract';
    message: BaseMsgMigrateContract;
  }

  export interface Data extends BaseMsgMigrateContract.AsObject {
    '@type': '/cosmwasm.wasm.v1.MsgMigrateContract';
  }

  export interface Amino extends BaseMsgMigrateContract.AsObject {
    type: 'wasm/MsgMigrateContract';
  }

  export interface Web3 extends BaseMsgMigrateContract.AsObject {
    '@type': '/cosmwasm.wasm.v1.MsgMigrateContract';
  }

  export type Proto = BaseMsgMigrateContract;
}

/**
 * @group Message
 */
export default class MsgMigrateContract extends MsgBase<
  MsgMigrateContract.Params,
  MsgMigrateContract.Data,
  MsgMigrateContract.Proto,
  MsgMigrateContract.Amino,
  MsgMigrateContract.DirectSign
> {
  static fromJSON(params: MsgMigrateContract.Params): MsgMigrateContract {
    return new MsgMigrateContract(params);
  }

  public toProto(): MsgMigrateContract.Proto {
    const { params } = this;

    const message = new BaseMsgMigrateContract();

    message.setSender(params.senderAddress);
    message.setCodeId(params.codeId);
    message.setContract(params.contractAddress);
    message.setMsg(toUtf8(JSON.stringify(params.msg)));

    return message;
  }

  public toData(): MsgMigrateContract.Data {
    const proto = this.toProto();

    return {
      '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
      ...proto.toObject(),
    };
  }

  public toAmino(): MsgMigrateContract.Amino {
    const proto = this.toProto();
    const message = {
      ...snakeCaseKeys(proto.toObject()),
    };

    const messageWithProperKeys = snakeCaseKeys(message);

    return ({
      type: 'wasm/MsgMigrateContract',
      ...messageWithProperKeys,
    } as unknown) as MsgMigrateContract.Amino;
  }

  public toWeb3(): MsgMigrateContract.Web3 {
    const amino = this.toAmino();
    const { type, ...rest } = amino;

    return ({
      '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
      ...rest,
    } as unknown) as MsgMigrateContract.Web3;
  }

  public toDirectSign(): MsgMigrateContract.DirectSign {
    const proto = this.toProto();

    return {
      type: '/cosmwasm.wasm.v1.MsgMigrateContract',
      message: proto,
    };
  }
}
