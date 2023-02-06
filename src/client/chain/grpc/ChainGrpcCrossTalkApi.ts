import { Query as CrossTalkQuery } from '@routerprotocol/chain-api/crosstalk/query_pb_service';
import { 
    QueryAllCrossTalkRequest,
    QueryAllCrossTalkRequestResponse,
    QueryAllCrosstalkRequestConfirmRequest,
    QueryAllCrosstalkRequestConfirmResponse,
    QueryAllCrossTalkAckRequest,
    QueryAllCrossTalkAckRequestResponse,
    QueryAllCrosstalkAckRequestConfirmRequest,
    QueryAllCrosstalkAckRequestConfirmResponse,
    QueryGetCrossTalkRequest,
    QueryGetCrossTalkRequestResponse,
    QueryGetCrossTalkAckRequest,
    QueryGetCrossTalkAckRequestResponse
 } from '@routerprotocol/chain-api/crosstalk/query_pb';
import BaseConsumer from '../../BaseGrpcConsumer';
import { ChainGrpcCrossTalkTransformer } from '../transformers';
import { PageRequest } from "@routerprotocol/chain-api/cosmos/base/query/v1beta1/pagination_pb";

/**
 * The CrossTalk module is responsible for managing crosstalk requests.
 * 
 * @group gRPC API
 * 
 *  @example
 * To use CrossTalk methods, initialise a {@link ChainGrpcCrossTalkApi} object to with a gRPC endpoint. An endpoint can be retrieved by using {@link networkEndpoints}.
 * ```ts
 * const endpoint =  getEndpointsForNetwork(Network.Devnet).grpcEndpoint;
 * const client = new ChainGrpcCrossTalkApi(endpoint);
 * const response = await client.fetchAllCrossTalkRequests();
 * ```
 */
export class ChainGrpcCrossTalkApi extends BaseConsumer {


    /**
     * 
     * @returns get acrosstalk request
     */
    async fetchCrossTalkRequest(chainType: number, chainId: string, eventNonce: number) {
        const request = new QueryGetCrossTalkRequest();
        request.setChainType(chainType);
        request.setChainId(chainId);
        request.setEventNonce(eventNonce);

        try {
            const response = await this.request<
                QueryGetCrossTalkRequest,
                QueryGetCrossTalkRequestResponse,
                typeof CrossTalkQuery.CrossTalkRequest
            >(request, CrossTalkQuery.CrossTalkRequest);

            return ChainGrpcCrossTalkTransformer.crossTalkRequest(response);
        } catch (e) {
            //@ts-ignore
            throw new Error(e.message);
        }
    }

    /**
     * @param pagination
     * @returns all crosstalk requests
     */
    async fetchAllCrossTalkRequests(pagination?: PageRequest) {
        const request = new QueryAllCrossTalkRequest();
        request.setPagination(pagination);

        try {
            const response = await this.request<
            QueryAllCrossTalkRequest,
            QueryAllCrossTalkRequestResponse,
            typeof CrossTalkQuery.CrossTalkRequestAll
            >(request, CrossTalkQuery.CrossTalkRequestAll);

            return ChainGrpcCrossTalkTransformer.allCrossTalkRequest(response);
        } catch (e) {
            //@ts-ignore
            throw new Error(e.message);
        }
    }

    /**
     * 
     * @param sourceChainType source chain type
     * @param sourceChainId source chain ID
     * @param eventNonce nonce
     * @param claimHash 
     * @param pagination
     * @returns all crosstalk request confirmations
     */
    async fetchAllCrosstalkRequestConfirmations(sourceChainType: number, sourceChainId: string, eventNonce: number, claimHash: string, pagination?: PageRequest) {
        const request = new QueryAllCrosstalkRequestConfirmRequest();
        request.setSourcechaintype(sourceChainType);
        request.setSourcechainid(sourceChainId);
        request.setEventnonce(eventNonce);
        request.setClaimhash(claimHash);
        request.setPagination(pagination)

        try {
            const response = await this.request<
            QueryAllCrosstalkRequestConfirmRequest,
            QueryAllCrosstalkRequestConfirmResponse,
            typeof CrossTalkQuery.CrosstalkRequestConfirmAll
            >(request, CrossTalkQuery.CrosstalkRequestConfirmAll);

            return ChainGrpcCrossTalkTransformer.allCrosstalkRequestConfirmations(response);
        } catch (e) {
            //@ts-ignore
            throw new Error(e.message);
        }
    }

    /**
     * 
     * @returns  all crosstalk acknowledgement requests
     */
    async fetchAllCrossTalkAckRequests(pagination?: PageRequest) {
        const request = new QueryAllCrossTalkAckRequest();
        request.setPagination(pagination);

        try {
            const response = await this.request<
            QueryAllCrossTalkAckRequest,
            QueryAllCrossTalkAckRequestResponse,
            typeof CrossTalkQuery.CrossTalkAckRequestAll
            >(request, CrossTalkQuery.CrossTalkAckRequestAll);

            return ChainGrpcCrossTalkTransformer.allCrossTalkAckRequest(response);
        } catch (e) {
            //@ts-ignore
            throw new Error(e.message);
        }
    }
    
    /**
     * Get crosstalk acknowledgement request
     * @param chainType 
     * @param chainId 
     * @param eventNonce 
     * @returns 
     */
    async fetchCrosstalkAckRequest(chainType: number, chainId: string, eventNonce: number) {
        const request = new QueryGetCrossTalkAckRequest();
        request.setChainType(chainType);
        request.setChainId(chainId);
        request.setEventNonce(eventNonce);

        try {
            const response = await this.request<
            QueryGetCrossTalkAckRequest,
            QueryGetCrossTalkAckRequestResponse,
            typeof CrossTalkQuery.CrossTalkAckRequest
            >(request, CrossTalkQuery.CrossTalkAckRequest);

            return ChainGrpcCrossTalkTransformer.crossTalkAckRequest(response);
        } catch (e) {
            //@ts-ignore
            throw new Error(e.message);
        }
    }

    /**
     * 
     * @param chainType chain type
     * @param chainId chain ID
     * @param eventNonce nonce
     * @param claimHash 
     * @param pagination
     * @returns all crosstalk acknowledgment confirmation
     */
    async fetchAllCrosstalkAckRequestConfirmations(chainType: number, chainId: string, eventNonce: number, claimHash: string, pagination?: PageRequest) {
        const request = new QueryAllCrosstalkAckRequestConfirmRequest();
        request.setChaintype(chainType);
        request.setChainid(chainId);
        request.setEventnonce(eventNonce);
        request.setClaimhash(claimHash);
        request.setPagination(pagination)

        try {
            const response = await this.request<
            QueryAllCrosstalkAckRequestConfirmRequest,
            QueryAllCrosstalkAckRequestConfirmResponse,
            typeof CrossTalkQuery.CrosstalkAckRequestConfirmAll
            >(request, CrossTalkQuery.CrosstalkAckRequestConfirmAll);

            return ChainGrpcCrossTalkTransformer.allCrosstalkAckRequestConfirmations(response);
        } catch (e) {
            //@ts-ignore
            throw new Error(e.message);
        }
    }
}