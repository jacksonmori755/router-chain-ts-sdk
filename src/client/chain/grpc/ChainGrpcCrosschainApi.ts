import { Query as CrosschainQuery } from '@routerprotocol/chain-api/routerchain/crosschain/query_pb_service';
import {
  QueryAllCrosschainRequestRequest,
  QueryAllCrosschainRequestResponse,
  QueryAllCrosschainRequestConfirmRequest,
  QueryAllCrosschainRequestConfirmResponse,
  QueryAllCrosschainAckRequestRequest,
  QueryAllCrosschainAckRequestResponse,
  QueryAllCrosschainAckRequestConfirmRequest,
  QueryAllCrosschainAckRequestConfirmResponse,
  QueryGetCrosschainRequestConfirmRequest,
  QueryGetCrosschainRequestConfirmResponse,
  QueryGetCrosschainAckRequestConfirmRequest,
  QueryGetCrosschainAckRequestConfirmResponse
} from '@routerprotocol/chain-api/routerchain/crosschain/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcCrosschainTransformer } from '../transformers';
import { PageRequest } from '@routerprotocol/chain-api/cosmos/base/query/v1beta1/pagination_pb';

/**
 * The Crosschain module is responsible for handling inbound, outbound and crosstalk requests.
 * 
 * @group gRPC API
 * 
 * @example
 * To use Crosschain methods, initialise a {@link ChainGrpcCrosschainApi} object to with a gRPC endpoint. An endpoint can be retrieved by using {@link networkEndpoints}.
 * ```ts
 * const endpoint =  getEndpointsForNetwork(Network.Devnet).grpcEndpoint;
 * const client = new ChainGrpcCrosschainApi(endpoint);
 * const response = await client.fetchCrosschainRequests();
 * ```
 */
export class ChainGrpcCrosschainApi extends BaseConsumer {

  /**
   * Fetches all crosschain requests
   * @param pageRequestObject 
   * @returns 
   */
  async fetchCrosschainRequests(pageRequestObject?: PageRequest.AsObject) {
    const request = new QueryAllCrosschainRequestRequest();

     // TODO: refactor to common transform
    if (pageRequestObject != null) {
      let pageRequest = new PageRequest();
      pageRequest.setKey(pageRequestObject.key)
      pageRequest.setOffset(pageRequestObject.offset)
      pageRequest.setLimit(pageRequestObject.offset)
      pageRequest.setCountTotal(pageRequestObject.countTotal)
      pageRequest.setReverse(pageRequestObject.reverse)
      request.setPagination(pageRequest);
    }

    try {
      const response = await this.request<
      QueryAllCrosschainRequestRequest,
      QueryAllCrosschainRequestResponse,
        typeof CrosschainQuery.CrosschainRequestAll
      >(request, CrosschainQuery.CrosschainRequestAll);

      return ChainGrpcCrosschainTransformer.crosschainRequests(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * Fetch crosschain request confirmations
   * @param sourceChainId 
   * @param requestIdentifier 
   * @param claimHash 
   * @param pageRequestObject 
   * @returns 
   */
  async fetchCrosschainRequestConfirmations(sourceChainId: string, requestIdentifier: number, claimHash: Uint8Array | string, pageRequestObject?: PageRequest.AsObject) {
    const request = new QueryAllCrosschainRequestConfirmRequest();
    request.setSourcechainid(sourceChainId);
    request.setRequestidentifier(requestIdentifier);
    request.setClaimhash(claimHash);

    // TODO: refactor to common transform
    if (pageRequestObject != null) {
        let pageRequest = new PageRequest();
        pageRequest.setKey(pageRequestObject.key)
        pageRequest.setOffset(pageRequestObject.offset)
        pageRequest.setLimit(pageRequestObject.offset)
        pageRequest.setCountTotal(pageRequestObject.countTotal)
        pageRequest.setReverse(pageRequestObject.reverse)
        request.setPagination(pageRequest);
    }

    try {
      const response = await this.request<
      QueryAllCrosschainRequestConfirmRequest,
      QueryAllCrosschainRequestConfirmResponse,
        typeof CrosschainQuery.CrosschainRequestConfirmAll
      >(request, CrosschainQuery.CrosschainRequestConfirmAll);

      return ChainGrpcCrosschainTransformer.crosschainRequestConfirmations(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * Fetch crosschain ack requests
   * @param pageRequestObject 
   * @returns 
   */
  async fetchCrosschainAckRequests(pageRequestObject?: PageRequest.AsObject) {
    const request = new QueryAllCrosschainAckRequestRequest();

    if (pageRequestObject != null) {
      let pageRequest = new PageRequest();
      pageRequest.setKey(pageRequestObject.key)
      pageRequest.setOffset(pageRequestObject.offset)
      pageRequest.setLimit(pageRequestObject.offset)
      pageRequest.setCountTotal(pageRequestObject.countTotal)
      pageRequest.setReverse(pageRequestObject.reverse)
      request.setPagination(pageRequest);
    }


    try {
      const response = await this.request<
      QueryAllCrosschainAckRequestRequest,
      QueryAllCrosschainAckRequestResponse,
        typeof CrosschainQuery.CrosschainAckRequestAll
      >(request, CrosschainQuery.CrosschainAckRequestAll);

      return ChainGrpcCrosschainTransformer.crosschainAckRequests(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * Fetch crosschain ack request confirmations
   * @param sourceChainId 
   * @param requestIdentifier 
   * @param claimHash 
   * @param pageRequestObject 
   * @returns 
   */
  async fetchCrosschainAckRequestConfirmations(sourceChainId: string, requestIdentifier: number, claimHash: Uint8Array | string, pageRequestObject?: PageRequest.AsObject) {
    const request = new QueryAllCrosschainAckRequestConfirmRequest();
    request.setAcksrcchainid(sourceChainId);
    request.setAckrequestidentifier(requestIdentifier);
    request.setClaimhash(claimHash);

    // TODO: refactor to common transform
    if (pageRequestObject != null) {
        let pageRequest = new PageRequest();
        pageRequest.setKey(pageRequestObject.key)
        pageRequest.setOffset(pageRequestObject.offset)
        pageRequest.setLimit(pageRequestObject.offset)
        pageRequest.setCountTotal(pageRequestObject.countTotal)
        pageRequest.setReverse(pageRequestObject.reverse)
        request.setPagination(pageRequest);
    }

    try {
      const response = await this.request<
      QueryAllCrosschainAckRequestConfirmRequest,
      QueryAllCrosschainAckRequestConfirmResponse,
        typeof CrosschainQuery.CrosschainAckRequestConfirmAll
      >(request, CrosschainQuery.CrosschainAckRequestConfirmAll);

      return ChainGrpcCrosschainTransformer.crosschainAckRequestConfirmations(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * Fetch crosschain request confirmation
   * @param sourceChainId 
   * @param requestIdentifier 
   * @param claimHash 
   * @param orchestrator 
   * @returns 
   */
  async fetchCrosschainRequestConfirmation(sourceChainId: string, requestIdentifier: number, claimHash: Uint8Array | string, orchestrator: string) {
    const request = new QueryGetCrosschainRequestConfirmRequest();
    request.setSourcechainid(sourceChainId);
    request.setRequestidentifier(requestIdentifier);
    request.setClaimhash(claimHash);
    request.setOrchestrator(orchestrator);

    try {
      const response = await this.request<
      QueryGetCrosschainRequestConfirmRequest,
      QueryGetCrosschainRequestConfirmResponse,
        typeof CrosschainQuery.CrosschainRequestConfirm
      >(request, CrosschainQuery.CrosschainRequestConfirm);

      return ChainGrpcCrosschainTransformer.crosschainRequestConfirmation(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * Fetch crosschain ack request confirmation
   * @param sourceChainId 
   * @param requestIdentifier 
   * @param claimHash 
   * @param orchestrator 
   * @returns 
   */
  async fetchCrosschainAckRequestConfirmation(sourceChainId: string, requestIdentifier: number, claimHash: Uint8Array | string, orchestrator: string) {
    const request = new  QueryGetCrosschainAckRequestConfirmRequest();
    request.setAcksrcchainid(sourceChainId);
    request.setAckrequestidentifier(requestIdentifier);
    request.setClaimhash(claimHash);
    request.setOrchestrator(orchestrator);

    try {
      const response = await this.request<
      QueryGetCrosschainAckRequestConfirmRequest,
      QueryGetCrosschainAckRequestConfirmResponse,
        typeof CrosschainQuery.CrosschainAckRequestConfirm
      >(request, CrosschainQuery.CrosschainAckRequestConfirm);

      return ChainGrpcCrosschainTransformer.crosschainAckRequestConfirmation(
        response
      );
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
