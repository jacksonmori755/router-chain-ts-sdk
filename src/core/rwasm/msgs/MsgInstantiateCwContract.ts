import { MsgInstantiateCwContract as BaseMsgInstantiateCwContract } from '@routerprotocol/chain-api/routerchain/rwasm/tx_pb';
import { MsgBase } from '../../MsgBase';
import snakeCaseKeys from 'snakecase-keys';

export declare namespace MsgInstantiateCwContract {
  export interface Params {
    sender: string;
    admin: string;
    codeId: number;
    label: string;
    msg: Object;
    amount?:
      | {
          denom: string;
          amount: string;
        }
      | {
          denom: string;
          amount: string;
        }[];
  }

  export interface DirectSign {
    type: '/routerprotocol.routerchain.rwasm.MsgInstantiateCwContract';
    message: BaseMsgInstantiateCwContract;
  }

  export interface Data extends BaseMsgInstantiateCwContract.AsObject {
    '@type': '/routerprotocol.routerchain.rwasm.MsgInstantiateCwContract';
  }

  export interface Amino extends BaseMsgInstantiateCwContract.AsObject {
    type: 'rwasm/InstantiateCwContract';
  }

  export interface Web3 extends BaseMsgInstantiateCwContract.AsObject {
    '@type': '/routerprotocol.routerchain.rwasm.MsgInstantiateCwContract';
  }

  export type Proto = BaseMsgInstantiateCwContract;
}

/**
 * @group Message
 */
export default class MsgInstantiateCwContract extends MsgBase<
  MsgInstantiateCwContract.Params,
  MsgInstantiateCwContract.Data,
  MsgInstantiateCwContract.Proto,
  MsgInstantiateCwContract.Amino,
  MsgInstantiateCwContract.DirectSign
> {
  static fromJSON(
    params: MsgInstantiateCwContract.Params
  ): MsgInstantiateCwContract {
    return new MsgInstantiateCwContract(params);
  }

  public toProto(): MsgInstantiateCwContract.Proto {
    const { params } = this;

    const message = new BaseMsgInstantiateCwContract();

    message.setMsg(JSON.stringify(params.msg));
    message.setSender(params.sender);
    message.setAdmin(params.admin === '' ? 'null' : params.admin);
    message.setCodeId(params.codeId);
    message.setLabel(params.label);

    if (params.amount) {
      const fundsToArray = Array.isArray(params.amount)
        ? params.amount
        : [params.amount];
      const funds = fundsToArray.map(coin => {
        return `${coin.amount}${coin.denom}`;
      });
      message.setFunds(funds.join(','));
    } else {
      message.setFunds('0');
    }
    return message;
  }

  public toData(): MsgInstantiateCwContract.Data {
    const proto = this.toProto();

    return {
      '@type': '/routerprotocol.routerchain.rwasm.MsgInstantiateCwContract',
      ...proto.toObject(),
    };
  }

  public toAmino(): MsgInstantiateCwContract.Amino {
    const proto = this.toProto();
    const message = {
      ...snakeCaseKeys(proto.toObject()),
    };

    // @ts-ignore
    delete message.funds_list;

    const messageWithProperKeys = snakeCaseKeys(message);

    return ({
      type: 'rwasm/InstantiateCwContract',
      ...messageWithProperKeys,
    } as unknown) as MsgInstantiateCwContract.Amino;
  }

  public toWeb3(): MsgInstantiateCwContract.Web3 {
    const amino = this.toAmino();
    const { type, ...rest } = amino;

    return ({
      '@type': '/routerprotocol.routerchain.rwasm.MsgInstantiateCwContract',
      ...rest,
    } as unknown) as MsgInstantiateCwContract.Web3;
  }

  public toDirectSign(): MsgInstantiateCwContract.DirectSign {
    const proto = this.toProto();

    return {
      type: '/routerprotocol.routerchain.rwasm.MsgInstantiateCwContract',
      message: proto,
    };
  }
}
