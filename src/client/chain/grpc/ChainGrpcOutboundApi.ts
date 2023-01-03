import { Query as OutboundQuery } from '@routerprotocol/chain-api/outbound/query_pb_service';
import {
    QueryAllOutgoingBatchTxRequest,
    QueryAllOutgoingBatchTxResponse,
    QueryGetOutgoingBatchTxRequest,
    QueryGetOutgoingBatchTxResponse,
    QueryGetOutgoingBatchConfirmRequest,
    QueryGetOutgoingBatchConfirmResponse,
    QueryAllOutgoingBatchConfirmRequest,
    QueryAllOutgoingBatchConfirmResponse,
    QueryLastOutboundBatchNonceRequest,
    QueryLastOutboundBatchNonceResponse
} from '@routerprotocol/chain-api/outbound/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcOutboundTransformer } from '../transformers';

/**
 * @category Chain Grpc API
 */
export class ChainGrpcOutboundApi extends BaseConsumer {

  /**
   * 
   * @returns all outgoing batch transaction list.
   */
  async fetchAllOutgoingBatchTx() {
    const request = new QueryAllOutgoingBatchTxRequest();

    try {
      const response = await this.request<
        QueryAllOutgoingBatchTxRequest,
        QueryAllOutgoingBatchTxResponse,
        typeof OutboundQuery.OutgoingBatchTxAll
      >(request, OutboundQuery.OutgoingBatchTxAll);

      return ChainGrpcOutboundTransformer.allOutgoingBatchTx(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @param destinationChainType destination chain type.
   * @param destinationChainId destination chain ID.
   * @param sourceAddress source address.
   * @param batchNonce nonce.
   * @returns outgoing batch transaction.
   */
  async fetchOutgoingBatchTx(
    destinationChainType: number,
    destinationChainId: string,
    sourceAddress: string,
    batchNonce: number
  ) {
    const request = new QueryGetOutgoingBatchTxRequest();
    request.setDestinationChainType(destinationChainType);
    request.setDestinationChainId(destinationChainId);
    request.setSourceAddress(sourceAddress);
    request.setNonce(batchNonce);

    try {
      const response = await this.request<
        QueryGetOutgoingBatchTxRequest,
        QueryGetOutgoingBatchTxResponse,
        typeof OutboundQuery.OutgoingBatchTx
      >(request, OutboundQuery.OutgoingBatchTx);

      return ChainGrpcOutboundTransformer.outgoingBatchTx(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @param destinationChainType destination chain type.
   * @param destinationChainId destination chain ID.
   * @param sourceAddress source address.
   * @param batchNonce nonce.
   * @param orchestrator orchestrator.
   * @returns confirmed outgoing batch transaction.
   */
  async fetchOutgoingBatchTxConfirm(
    destinationChainType: number,
    destinationChainId: string,
    sourceAddress: string,
    batchNonce: number,
    orchestrator: string
  ) {
    const request = new QueryGetOutgoingBatchConfirmRequest();
    request.setDestinationChainType(destinationChainType);
    request.setDestinationChainId(destinationChainId);
    request.setSourceAddress(sourceAddress);
    request.setNonce(batchNonce);
    request.setOrchestrator(orchestrator);

    try {
      const response = await this.request<
      QueryGetOutgoingBatchConfirmRequest,
        QueryGetOutgoingBatchConfirmResponse,
        typeof OutboundQuery.OutgoingBatchConfirm
      >(request, OutboundQuery.OutgoingBatchConfirm);

      return ChainGrpcOutboundTransformer.outgoingBatchTxConfirm(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @param destinationChainType destination chain type.
   * @param destinationChainId destination chain ID.
   * @param sourceAddress source address.
   * @param batchNonce nonce.
   * @returns all confirmed outgoing batch transactions.
   */
  async fetchAllOutgoingBatchTxConfirms(
    destinationChainType: number,
    destinationChainId: string,
    sourceAddress: string,
    batchNonce: number
  ) {
    const request = new QueryAllOutgoingBatchConfirmRequest();
    request.setDestinationChainType(destinationChainType);
    request.setDestinationChainId(destinationChainId);
    request.setSourceAddress(sourceAddress);
    request.setNonce(batchNonce);

    try {
      const response = await this.request<
      QueryAllOutgoingBatchConfirmRequest,
        QueryAllOutgoingBatchConfirmResponse,
        typeof OutboundQuery.OutgoingBatchConfirmAll
      >(request, OutboundQuery.OutgoingBatchConfirmAll);

      return ChainGrpcOutboundTransformer.allOutgoingBatchTxConfirms(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @param destinationChainType destination chain type.
   * @param destinationChainId destination chain ID.
   * @param sourceAddress source address.
   * @returns nonce for last outbound batch.
   */
  async fetchLastOutboundBatchNonce(destinationChainType: number, destinationChainId: string, sourceAddress: string) {
    const request = new QueryLastOutboundBatchNonceRequest();
    request.setDestinationChainType(destinationChainType);
    request.setDestinationChainId(destinationChainId);
    request.setSourceAddress(sourceAddress);

    try {
      const response = await this.request<
        QueryLastOutboundBatchNonceRequest,
        QueryLastOutboundBatchNonceResponse,
        typeof OutboundQuery.LastOutboundBatchNonce
      >(request, OutboundQuery.LastOutboundBatchNonce);

      return ChainGrpcOutboundTransformer.lastOutboundBatchNonce(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
