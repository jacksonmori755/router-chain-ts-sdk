import { HttpClient } from '../utils';

/**
 * @hidden
 */
export default class BaseRestConsumer {
  protected client: HttpClient;

  constructor(endpoint: string) {
    this.client = new HttpClient(endpoint);
  }
}
