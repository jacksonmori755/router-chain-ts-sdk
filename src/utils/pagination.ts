import { PageRequest } from '@routerprotocol/chain-api/cosmos/base/query/v1beta1/pagination_pb';
import { PaginationOption } from '../types/pagination';
import { Pagination, PagePagination } from '../types/pagination';
import { PageResponse } from '@routerprotocol/chain-api/cosmos/base/query/v1beta1/pagination_pb';

export const paginationRequestFromPagination = (
  pagination?: PaginationOption
): PageRequest | undefined => {
  const paginationForRequest = new PageRequest();

  if (!pagination) {
    return;
  }

  if (pagination.key) {
    paginationForRequest.setKey(pagination.key);
  }

  if (pagination.limit !== undefined) {
    paginationForRequest.setLimit(pagination.limit);
  }

  if (pagination.offset !== undefined) {
    paginationForRequest.setOffset(pagination.offset);
  }

  if (pagination.reverse !== undefined) {
    paginationForRequest.setReverse(pagination.reverse);
  }

  if (pagination.countTotal !== undefined) {
    paginationForRequest.setCountTotal(pagination.countTotal);
  }

  return paginationForRequest;
};

export const generatePagination = (
  pagination: Pagination | PagePagination | undefined
) => {
  if (!pagination) {
    return;
  }

  if (!pagination.nextKey) {
    return;
  }

  return {
    pagination: {
      key: pagination.nextKey,
    },
  };
};

export const paginationUint8ArrayToString = (key: any) => {
  if (key.constructor !== Uint8Array) {
    return key as string;
  }

  // TODO: uncomment
  // return new TextDecoder().decode(key)
  return '';
};

export const pageResponseToPagination = ({
  newPagination,
  oldPagination,
}: {
  oldPagination: PagePagination | undefined;
  newPagination?: Pagination | undefined;
}): PagePagination => {
  if (!newPagination) {
    return {
      prev: null,
      current: null,
      nextKey: null,
    };
  }

  const nextKey = paginationUint8ArrayToString(newPagination.nextKey);

  if (!oldPagination) {
    return {
      prev: null,
      current: null,
      nextKey,
    };
  }

  return {
    prev: oldPagination.current,
    current: oldPagination.nextKey,
    nextKey,
  };
};

export const grpcPaginationToPagination = (
  pagination: PageResponse | undefined
): PageResponse.AsObject => {
  return {
    total: pagination
      ? pagination.getTotal() : 0,
    nextKey: pagination
      ? pagination.getNextKey_asB64(): '',
  };
};
