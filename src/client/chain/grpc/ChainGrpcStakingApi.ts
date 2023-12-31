import {
  QueryDelegatorDelegationsRequest,
  QueryDelegatorDelegationsResponse,
  QueryDelegatorUnbondingDelegationsRequest,
  QueryDelegatorUnbondingDelegationsResponse,
  QueryValidatorDelegationsRequest,
  QueryRedelegationsRequest,
  QueryPoolRequest,
  QueryPoolResponse,
  QueryRedelegationsResponse,
  QueryValidatorDelegationsResponse,
  QueryValidatorsRequest,
  QueryValidatorsResponse,
  QueryDelegationResponse,
  QueryDelegationRequest,
  QueryValidatorRequest,
  QueryValidatorResponse,
  QueryParamsRequest as QueryStakingParamsRequest,
  QueryParamsResponse as QueryStakingParamsResponse,
  QueryValidatorUnbondingDelegationsRequest,
  QueryValidatorUnbondingDelegationsResponse,
} from '@routerprotocol/chain-api/cosmos/staking/v1beta1/query_pb';
import { Query as StakingQuery } from '@routerprotocol/chain-api/cosmos/staking/v1beta1/query_pb_service';
import BaseConsumer from '../../BaseGrpcConsumer';
import { PaginationOption } from '../../../types/pagination';
import { paginationRequestFromPagination } from '../../../utils/pagination';
import { ChainGrpcStakingTransformer } from '../transformers';

/**
 * @group gRPC API
 */
export class ChainGrpcStakingApi extends BaseConsumer {
         async fetchModuleParams() {
           const request = new QueryStakingParamsRequest();

           try {
             const response = await this.request<
               QueryStakingParamsRequest,
               QueryStakingParamsResponse,
               typeof StakingQuery.Params
             >(request, StakingQuery.Params);

             return ChainGrpcStakingTransformer.moduleParamsResponseToModuleParams(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchPool() {
           const request = new QueryPoolRequest();

           try {
             const response = await this.request<
               QueryPoolRequest,
               QueryPoolResponse,
               typeof StakingQuery.Pool
             >(request, StakingQuery.Pool);

             return ChainGrpcStakingTransformer.poolResponseToPool(response);
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchValidators() {
           const request = new QueryValidatorsRequest();

           try {
             const response = await this.request<
               QueryValidatorsRequest,
               QueryValidatorsResponse,
               typeof StakingQuery.Validators
             >(request, StakingQuery.Validators);

             return ChainGrpcStakingTransformer.validatorsResponseToValidators(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchValidator(address: string) {
           const request = new QueryValidatorRequest();
           request.setValidatorAddr(address);

           try {
             const response = await this.request<
               QueryValidatorRequest,
               QueryValidatorResponse,
               typeof StakingQuery.Validator
             >(request, StakingQuery.Validator);

             return ChainGrpcStakingTransformer.validatorResponseToValidator(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchValidatorDelegations({
           validatorAddress,
           pagination,
         }: {
           validatorAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryValidatorDelegationsRequest();
           request.setValidatorAddr(validatorAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryValidatorDelegationsRequest,
               QueryValidatorDelegationsResponse,
               typeof StakingQuery.ValidatorDelegations
             >(request, StakingQuery.ValidatorDelegations);

             return ChainGrpcStakingTransformer.delegationsResponseToDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchValidatorDelegationsNoThrow({
           validatorAddress,
           pagination,
         }: {
           validatorAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryValidatorDelegationsRequest();
           request.setValidatorAddr(validatorAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryValidatorDelegationsRequest,
               QueryValidatorDelegationsResponse,
               typeof StakingQuery.ValidatorDelegations
             >(request, StakingQuery.ValidatorDelegations);

             return ChainGrpcStakingTransformer.delegationsResponseToDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             if (e.message.includes('does not exist')) {
               return {
                 delegations: [],
                 pagination: { total: 0, next: '' },
               };
             }
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchValidatorUnbondingDelegations({
           validatorAddress,
           pagination,
         }: {
           validatorAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryValidatorUnbondingDelegationsRequest();
           request.setValidatorAddr(validatorAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryValidatorUnbondingDelegationsRequest,
               QueryValidatorUnbondingDelegationsResponse,
               typeof StakingQuery.ValidatorUnbondingDelegations
             >(request, StakingQuery.ValidatorUnbondingDelegations);

             return ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchValidatorUnbondingDelegationsNoThrow({
           validatorAddress,
           pagination,
         }: {
           validatorAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryValidatorUnbondingDelegationsRequest();
           request.setValidatorAddr(validatorAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryValidatorUnbondingDelegationsRequest,
               QueryValidatorUnbondingDelegationsResponse,
               typeof StakingQuery.ValidatorUnbondingDelegations
             >(request, StakingQuery.ValidatorUnbondingDelegations);

             return ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             if (e.message.includes('does not exist')) {
               return {
                 unbondingDelegations: [],
                 pagination: { total: 0, next: '' },
               };
             }
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchDelegation({
           routerAddress,
           validatorAddress,
         }: {
           routerAddress: string;
           validatorAddress: string;
         }) {
           const request = new QueryDelegationRequest();
           request.setDelegatorAddr(routerAddress);
           request.setValidatorAddr(validatorAddress);

           try {
             const response = await this.request<
               QueryDelegationRequest,
               QueryDelegationResponse,
               typeof StakingQuery.Delegation
             >(request, StakingQuery.Delegation);

             return ChainGrpcStakingTransformer.delegationResponseToDelegation(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchDelegations({
           routerAddress,
           pagination,
         }: {
           routerAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryDelegatorDelegationsRequest();
           request.setDelegatorAddr(routerAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryDelegatorDelegationsRequest,
               QueryDelegatorDelegationsResponse,
               typeof StakingQuery.DelegatorDelegations
             >(request, StakingQuery.DelegatorDelegations);

             return ChainGrpcStakingTransformer.delegationsResponseToDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchDelegationsNoThrow({
           routerAddress,
           pagination,
         }: {
           routerAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryDelegatorDelegationsRequest();
           request.setDelegatorAddr(routerAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryDelegatorDelegationsRequest,
               QueryDelegatorDelegationsResponse,
               typeof StakingQuery.DelegatorDelegations
             >(request, StakingQuery.DelegatorDelegations);

             return ChainGrpcStakingTransformer.delegationsResponseToDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             if (e.message.includes('does not exist')) {
               return {
                 delegations: [],
                 pagination: { total: 0, next: '' },
               };
             }
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchDelegators({
           validatorAddress,
           pagination,
         }: {
           validatorAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryValidatorDelegationsRequest();
           request.setValidatorAddr(validatorAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryValidatorDelegationsRequest,
               QueryValidatorDelegationsResponse,
               typeof StakingQuery.ValidatorDelegations
             >(request, StakingQuery.ValidatorDelegations);

             return ChainGrpcStakingTransformer.delegationsResponseToDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchDelegatorsNoThrow({
           validatorAddress,
           pagination,
         }: {
           validatorAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryValidatorDelegationsRequest();
           request.setValidatorAddr(validatorAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryValidatorDelegationsRequest,
               QueryValidatorDelegationsResponse,
               typeof StakingQuery.ValidatorDelegations
             >(request, StakingQuery.ValidatorDelegations);

             return ChainGrpcStakingTransformer.delegationsResponseToDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             if (e.message.includes('does not exist')) {
               return {
                 delegations: [],
                 pagination: { total: 0, next: '' },
               };
             }
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchUnbondingDelegations({
           routerAddress,
           pagination,
         }: {
           routerAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryDelegatorUnbondingDelegationsRequest();
           request.setDelegatorAddr(routerAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryDelegatorUnbondingDelegationsRequest,
               QueryDelegatorUnbondingDelegationsResponse,
               typeof StakingQuery.DelegatorUnbondingDelegations
             >(request, StakingQuery.DelegatorUnbondingDelegations);

             return ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchUnbondingDelegationsNoThrow({
           routerAddress,
           pagination,
         }: {
           routerAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryDelegatorUnbondingDelegationsRequest();
           request.setDelegatorAddr(routerAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryDelegatorUnbondingDelegationsRequest,
               QueryDelegatorUnbondingDelegationsResponse,
               typeof StakingQuery.DelegatorUnbondingDelegations
             >(request, StakingQuery.DelegatorUnbondingDelegations);

             return ChainGrpcStakingTransformer.unBondingDelegationsResponseToUnBondingDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             if (e.message.includes('does not exist')) {
               return {
                 unbondingDelegations: [],
                 pagination: { total: 0, next: '' },
               };
             }
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchReDelegations({
           routerAddress,
           pagination,
         }: {
           routerAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryRedelegationsRequest();
           request.setDelegatorAddr(routerAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryRedelegationsRequest,
               QueryRedelegationsResponse,
               typeof StakingQuery.Redelegations
             >(request, StakingQuery.Redelegations);

             return ChainGrpcStakingTransformer.reDelegationsResponseToReDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             throw new Error(e.message);
           }
         }

         async fetchReDelegationsNoThrow({
           routerAddress,
           pagination,
         }: {
           routerAddress: string;
           pagination?: PaginationOption;
         }) {
           const request = new QueryRedelegationsRequest();
           request.setDelegatorAddr(routerAddress);

           const paginationForRequest = paginationRequestFromPagination(
             pagination
           );

           if (paginationForRequest) {
             request.setPagination(paginationForRequest);
           }

           try {
             const response = await this.request<
               QueryRedelegationsRequest,
               QueryRedelegationsResponse,
               typeof StakingQuery.Redelegations
             >(request, StakingQuery.Redelegations);

             return ChainGrpcStakingTransformer.reDelegationsResponseToReDelegations(
               response
             );
           } catch (e) {
             //@ts-ignore
             if (e.message.includes('does not exist')) {
               return {
                 redelegations: [],
                 pagination: { total: 0, next: '' },
               };
             }
             //@ts-ignore
             throw new Error(e.message);
           }
         }
       }
