import { KeyValueAny } from '../types';
import axios from 'axios';
import { getUrlEndpointForNetwork, Network } from '../../networks';

export const gqlFetcher = async (
  chainEnvironment: Network,
  queryTag: String,
  options: KeyValueAny
) => {
  try {
    const response = await axios.post(
      getUrlEndpointForNetwork(chainEnvironment).explorerGql,
      {
        query: queryTag,
        variables: options,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.data;
  } catch (e) {
    console.error(`Error while fetching the data - ${e}`);
  }
};
