import { MsgMigrateCwContract as BaseMsgMigrateCwContract } from '@routerprotocol/chain-api/routerchain/rwasm/tx_pb';
import { MsgBase } from '../../MsgBase';
import snakeCaseKeys from 'snakecase-keys';

export declare namespace MsgMigrateCwContract {
  export interface Params {
    senderAddress: string;
    contractAddress: string;
    codeId: number;
    msg: Object;
  }

  export interface DirectSign {
    type: '/routerprotocol.routerchain.rwasm.MsgMigrateCwContract';
    message: BaseMsgMigrateCwContract;
  }

  export interface Data extends BaseMsgMigrateCwContract.AsObject {
    '@type': '/routerprotocol.routerchain.rwasm.MsgMigrateCwContract';
  }

  export interface Amino extends BaseMsgMigrateCwContract.AsObject {
    type: 'rwasm/MigrateCwContract';
  }

  export interface Web3 extends BaseMsgMigrateCwContract.AsObject {
    '@type': '/routerprotocol.routerchain.rwasm.MsgMigrateCwContract';
  }

  export type Proto = BaseMsgMigrateCwContract;
}

/**
 * @group Message
 */
export default class MsgMigrateCwContract extends MsgBase<
  MsgMigrateCwContract.Params,
  MsgMigrateCwContract.Data,
  MsgMigrateCwContract.Proto,
  MsgMigrateCwContract.Amino,
  MsgMigrateCwContract.DirectSign
> {
  static fromJSON(params: MsgMigrateCwContract.Params): MsgMigrateCwContract {
    return new MsgMigrateCwContract(params);
  }

  public toProto(): MsgMigrateCwContract.Proto {
    const { params } = this;

    const message = new BaseMsgMigrateCwContract();

    message.setSender(params.senderAddress);
    message.setCodeId(params.codeId);
    message.setContract(params.contractAddress);
    message.setMsg(JSON.stringify(params.msg));

    return message;
  }

  public toData(): MsgMigrateCwContract.Data {
    const proto = this.toProto();

    return {
      '@type': '/routerprotocol.routerchain.rwasm.MsgMigrateCwContract',
      ...proto.toObject(),
    };
  }

  public toAmino(): MsgMigrateCwContract.Amino {
    const proto = this.toProto();
    const message = {
      ...snakeCaseKeys(proto.toObject()),
    };

    const messageWithProperKeys = snakeCaseKeys(message);

    return ({
      type: 'rwasm/MigrateCwContract',
      ...messageWithProperKeys,
    } as unknown) as MsgMigrateCwContract.Amino;
  }

  public toWeb3(): MsgMigrateCwContract.Web3 {
    const amino = this.toAmino();
    const { type, ...rest } = amino;

    return ({
      '@type': '/routerprotocol.routerchain.rwasm.MsgMigrateCwContract',
      ...rest,
    } as unknown) as MsgMigrateCwContract.Web3;
  }

  public toDirectSign(): MsgMigrateCwContract.DirectSign {
    const proto = this.toProto();

    return {
      type: '/routerprotocol.routerchain.rwasm.MsgMigrateCwContract',
      message: proto,
    };
  }
}
