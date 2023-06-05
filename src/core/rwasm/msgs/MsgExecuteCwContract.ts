import { MsgExecuteCwContract as BaseMsgExecuteCwContract } from '@routerprotocol/chain-api/routerchain/rwasm/tx_pb';
import snakeCaseKeys from 'snakecase-keys';
//import { toUtf8 } from '../../../utils';
import { MsgBase } from '../../MsgBase';

export declare namespace MsgExecuteCwContract {
  export interface Params {
    funds?:
      | {
          denom: string;
          amount: string;
        }
      | {
          denom: string;
          amount: string;
        }[];
    sender: string;
    contractAddress: string;
    msg: Object;
  }

  export interface DirectSign {
    type: '/routerprotocol.routerchain.rwasm.MsgExecuteCwContract';
    message: BaseMsgExecuteCwContract;
  }

  export interface Data extends BaseMsgExecuteCwContract.AsObject {
    '@type': '/routerprotocol.routerchain.rwasm.MsgExecuteCwContract';
  }

  export interface Amino extends BaseMsgExecuteCwContract.AsObject {
    type: 'rwasm/ExecuteCwContract';
  }

  export interface Web3 extends BaseMsgExecuteCwContract.AsObject {
    '@type': '/routerprotocol.routerchain.rwasm.MsgExecuteCwContract';
  }

  export type Proto = BaseMsgExecuteCwContract;
}

/**
 * @group Message
 */
export default class MsgExecuteCwContract extends MsgBase<
  MsgExecuteCwContract.Params,
  MsgExecuteCwContract.Data,
  MsgExecuteCwContract.Proto,
  MsgExecuteCwContract.Amino,
  MsgExecuteCwContract.DirectSign
> {
  static fromJSON(params: MsgExecuteCwContract.Params): MsgExecuteCwContract {
    return new MsgExecuteCwContract(params);
  }

  public toProto(): MsgExecuteCwContract.Proto {
    const { params } = this;

    const message = new BaseMsgExecuteCwContract();

    message.setMsg(JSON.stringify(params.msg));
    message.setSender(params.sender);
    message.setContract(params.contractAddress);

    if (params.funds) {
      const fundsToArray = Array.isArray(params.funds)
        ? params.funds
        : [params.funds];
      const funds = fundsToArray.map(coin => {
        return `${coin.amount}${coin.denom}`;
      });
      message.setFunds(funds.join(','));
    } else {
      message.setFunds('0');
    }

    return message;
  }

  public toData(): MsgExecuteCwContract.Data {
    const proto = this.toProto();

    return {
      '@type': '/routerprotocol.routerchain.rwasm.MsgExecuteCwContract',
      ...proto.toObject(),
    };
  }

  public toAmino(): MsgExecuteCwContract.Amino {
    const proto = this.toProto();
    const message = {
      ...snakeCaseKeys(proto.toObject()),
    };

    // @ts-ignore
    delete message.funds_list;

    return ({
      type: 'rwasm/ExecuteCwContract',
      ...message,
    } as unknown) as MsgExecuteCwContract.Amino;
  }

  public toWeb3(): MsgExecuteCwContract.Web3 {
    const amino = this.toAmino();
    const { type, ...rest } = amino;

    return ({
      '@type': '/routerprotocol.routerchain.rwasm.MsgExecuteCwContract',
      ...rest,
    } as unknown) as MsgExecuteCwContract.Web3;
  }

  public toDirectSign(): MsgExecuteCwContract.DirectSign {
    const proto = this.toProto();

    return {
      type: '/routerprotocol.routerchain.rwasm.MsgExecuteCwContract',
      message: proto,
    };
  }
}
