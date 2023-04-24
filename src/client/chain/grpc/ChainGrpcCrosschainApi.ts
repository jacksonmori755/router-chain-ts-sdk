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

export class ChainGrpcCrosschainApi extends BaseConsumer {

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
