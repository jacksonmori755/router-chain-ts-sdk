import { Query as AttestationQuery } from '@routerprotocol/chain-api/attestation/query_pb_service';
import {
  QueryLatestValsetNonceRequest,
  QueryLatestValsetNonceResponse,
  QueryAllValsetRequest,
  QueryAllValsetResponse,
  QueryGetValsetResponse,
  QueryGetValsetRequest,
  QueryLatestValsetRequest,
  QueryLatestValsetResponse,
  QueryLastEventNonceRequest,
  QueryLastEventNonceResponse,
  QueryListOrchestratorsRequest,
  QueryListOrchestratorsResponse
} from '@routerprotocol/chain-api/attestation/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcAttestationTransformer } from '../transformers';

/**
 * The Attestation module is responsible for Valset (Validator set) and vote management.
 * 
 * @group gRPC API
 * 
 * @example
 * To use Attestation methods, initialise a {@link ChainGrpcAttestationApi} object to with a gRPC endpoint. An endpoint can be retrieved by using {@link networkEndpoints}.
 * ```ts
 * const endpoint =  networkEndpoints["alpha devnet"];
 * const client = new ChainGrpcAttestationApi(endpoint.grpcEndpoint);
 * const response = await client.fetchLatestValsetNonce();
 * ```
 */
export class ChainGrpcAttestationApi extends BaseConsumer {

  /**
   * 
   * @returns latest valset nonce.
   */
  async fetchLatestValsetNonce() {
    const request = new QueryLatestValsetNonceRequest();

    try {
      const response = await this.request<
        QueryLatestValsetNonceRequest,
        QueryLatestValsetNonceResponse,
        typeof AttestationQuery.LatestValsetNonce
      >(request, AttestationQuery.LatestValsetNonce);
      
      return ChainGrpcAttestationTransformer.latestValsetNonce(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @returns all valsets.
   */
  async fetchAllValsets() {
    const request = new QueryAllValsetRequest();

    try {
      const response = await this.request<
        QueryAllValsetRequest,
        QueryAllValsetResponse,
        typeof AttestationQuery.ValsetAll
      >(request, AttestationQuery.ValsetAll);

      return ChainGrpcAttestationTransformer.allValset(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @param valsetNonce nonce of valset.
   * @returns valset.
   */
  async fetchValsetByNonce(valsetNonce: number) {
    const request = new QueryGetValsetRequest();
    request.setNonce(valsetNonce);

    try {
      const response = await this.request<
        QueryGetValsetRequest,
        QueryGetValsetResponse,
        typeof AttestationQuery.Valset
      >(request, AttestationQuery.Valset);

      return ChainGrpcAttestationTransformer.valsetByNonce(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @returns latest valset.
   */
  async fetchLatestValset() {
    const request = new QueryLatestValsetRequest();

    try {
      const response = await this.request<
        QueryLatestValsetRequest,
        QueryLatestValsetResponse,
        typeof AttestationQuery.LatestValset
      >(request, AttestationQuery.LatestValset);

      return ChainGrpcAttestationTransformer.latestValset(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @param chainType chain type.
   * @param chainId chain ID.
   * @param valAddress validator address.
   * @returns last event nonce for a validator.
   */
  async fetchLastEventByValidator(chainType: number, chainId: string, valAddress: string) {
    const request = new QueryLastEventNonceRequest();
    request.setChainType(chainType);
    request.setChainId(chainId);
    request.setValidatorAddress(valAddress);

    try {
      const response = await this.request<
        QueryLastEventNonceRequest,
        QueryLastEventNonceResponse,
        typeof AttestationQuery.LastEventNonce
      >(request, AttestationQuery.LastEventNonce);

      return ChainGrpcAttestationTransformer.lastEventByValidator(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }

  /**
   * 
   * @returns list of all orchestrators.
   */
  async fetchAllOrchestrators() {
    const request = new QueryListOrchestratorsRequest();

    try {
      const response = await this.request<
      QueryListOrchestratorsRequest,
      QueryListOrchestratorsResponse,
        typeof AttestationQuery.ListOrchestrators
      >(request, AttestationQuery.ListOrchestrators);

      return ChainGrpcAttestationTransformer.listOrchestrators(response);
    } catch (e) {
      //@ts-ignore
      throw new Error(e.message);
    }
  }
}
