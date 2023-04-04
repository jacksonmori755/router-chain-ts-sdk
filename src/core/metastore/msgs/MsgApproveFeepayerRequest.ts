import { MsgApproveFeepayerRequest as BaseMsgApproveFeepayerRequest } from '@routerprotocol/chain-api/metastore/tx_pb';
//import { ChainTypeMap } from '@routerprotocol/chain-api/multichain/chain_type_pb';
import snakeCaseKeys from 'snakecase-keys';
import { toUtf8 } from '../../../utils';
import { MsgBase } from '../../MsgBase';

export declare namespace MsgApproveFeepayerRequest {
  export interface Params {
    feepayer: string;
    // chaintype: ChainTypeMap[keyof ChainTypeMap];
    // chainid: string;
    daapaddresses: string;
  }

  export interface DirectSign {
    type: '/routerprotocol.routerchain.metastore.MsgApproveFeepayerRequest';
    message: BaseMsgApproveFeepayerRequest;
  }

  export interface Data extends BaseMsgApproveFeepayerRequest.AsObject {
    '@type': '/routerprotocol.routerchain.metastore.MsgApproveFeepayerRequest';
  }

  export interface Amino extends BaseMsgApproveFeepayerRequest.AsObject {
    type: 'metastore/ApproveFeepayerRequest';
  }

  export interface Web3 extends BaseMsgApproveFeepayerRequest.AsObject {
    '@type': '/routerprotocol.routerchain.metastore.MsgApproveFeepayerRequest';
  }

  export type Proto = BaseMsgApproveFeepayerRequest;
}

/**
 * @group Message
 */
export default class MsgApproveFeepayerRequest extends MsgBase<
  MsgApproveFeepayerRequest.Params,
  MsgApproveFeepayerRequest.Data,
  MsgApproveFeepayerRequest.Proto,
  MsgApproveFeepayerRequest.Amino,
  MsgApproveFeepayerRequest.DirectSign
> {
  static fromJSON(
    params: MsgApproveFeepayerRequest.Params
  ): MsgApproveFeepayerRequest {
    return new MsgApproveFeepayerRequest(params);
  }

  public toProto(): MsgApproveFeepayerRequest.Proto {
                                                      const { params } = this;

                                                      const message = new BaseMsgApproveFeepayerRequest();
                                                      message.setFeepayer(
                                                        params.feepayer
                                                      );
                                                      // message.setChaintype(params.chaintype);
                                                      // message.setChainid(params.chainid);
                                                      message.setDaapaddress(
                                                        toUtf8(
                                                          params.daapaddresses
                                                        )
                                                      );

                                                      return message;
                                                    }

  public toData(): MsgApproveFeepayerRequest.Data {
    const proto = this.toProto();

    return {
      '@type':
        '/routerprotocol.routerchain.metastore.MsgApproveFeepayerRequest',
      ...proto.toObject(),
    };
  }

  public toAmino(): MsgApproveFeepayerRequest.Amino {
    const proto = this.toProto();
    const message = {
      ...snakeCaseKeys(proto.toObject()),
    };
    return ({
      type: 'metastore/ApproveFeepayerRequest',
      ...message,
    } as unknown) as MsgApproveFeepayerRequest.Amino;
  }

  public toWeb3(): MsgApproveFeepayerRequest.Web3 {
    const amino = this.toAmino();
    const { type, ...rest } = amino;

    return ({
      '@type':
        '/routerprotocol.routerchain.metastore.MsgApproveFeepayerRequest',
      ...rest,
    } as unknown) as MsgApproveFeepayerRequest.Web3;
  }

  public toDirectSign(): MsgApproveFeepayerRequest.DirectSign {
    const proto = this.toProto();

    return {
      type: '/routerprotocol.routerchain.metastore.MsgApproveFeepayerRequest',
      message: proto,
    };
  }
}
