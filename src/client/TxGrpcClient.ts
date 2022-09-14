import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { ServiceClient } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/service_pb_service';
import {
  BroadcastTxRequest,
  BroadcastMode,
  SimulateRequest,
  BroadcastModeMap,
} from '@routerprotocol/chain-api/cosmos/tx/v1beta1/service_pb';
import {
  GasInfo,
  Result,
  TxResponse,
} from '@routerprotocol/chain-api/cosmos/base/abci/v1beta1/abci_pb';
import { TxRaw } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_pb';
import { isServerSide } from '../utils';

export class TxGrpcClient {
  public txService: ServiceClient;

  constructor(endpoint: string) {
    this.txService = new ServiceClient(endpoint, {
      transport: isServerSide() ? NodeHttpTransport() : undefined,
    });
  }

  public async simulate(
    txRaw: TxRaw
  ): Promise<{
    result: Result.AsObject;
    gasInfo: GasInfo.AsObject;
  }> {
    const { txService } = this;

    const simulateRequest = new SimulateRequest();
    simulateRequest.setTxBytes(txRaw.serializeBinary());

    try {
      return new Promise((resolve, reject) =>
        txService.simulate(simulateRequest, (error, response) => {
          if (error || !response) {
            return reject(error);
          }

          const result = response.getResult();
          const gasInfo = response.getGasInfo();

          return resolve({
            result: result ? result.toObject() : ({} as Result.AsObject),
            gasInfo: gasInfo ? gasInfo.toObject() : ({} as GasInfo.AsObject),
          });
        })
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  public async broadcast(
    txRaw: TxRaw,
    broadcastMode: BroadcastModeMap[keyof BroadcastModeMap] = BroadcastMode.BROADCAST_MODE_BLOCK
  ): Promise<TxResponse.AsObject> {
    const { txService } = this;

    const broadcastTxRequest = new BroadcastTxRequest();
    broadcastTxRequest.setTxBytes(txRaw.serializeBinary());
    broadcastTxRequest.setMode(broadcastMode);

    try {
      return new Promise((resolve, reject) =>
        txService.broadcastTx(broadcastTxRequest, (error, response) => {
          if (error || !response) {
            console.log('error broadcast', JSON.stringify(error));
            return reject(error);
          }

          const txResponse = response.getTxResponse();
          console.log('Broadcast txResponse', txResponse);
          return resolve(
            (txResponse ? txResponse.toObject() : {}) as TxResponse.AsObject
          );
        })
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
