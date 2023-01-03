export interface PaginationOption {
  key?: string
  offset?: number
  skip?: number
  limit?: number
  reverse?: boolean
  countTotal?: boolean,
  endTime?: number
}

export interface PagePagination {
  nextKey: string | null
  prev: string | null
  current: string | null
}

export interface Pagination {
  nextKey: string | Uint8Array
  total: number
}

export interface ExchangePagination {
  to: number
  from: number
  total: number
}
