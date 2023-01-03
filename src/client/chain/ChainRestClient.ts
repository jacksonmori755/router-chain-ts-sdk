import { ChainRestAuthApi } from './rest/ChainRestAuthApi'

/**
 * @group REST API
 * @hidden
 */
export class ChainRestClient {
  auth: ChainRestAuthApi

  constructor(endpoint: string) {
    this.auth = new ChainRestAuthApi(endpoint)
  }
}
