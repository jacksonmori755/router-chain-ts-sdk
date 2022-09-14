import { gqlApis } from '../constants';
import { KeyValueAny } from '../types';
import axios from 'axios';

export const gqlFetcher = async (
  chainEnvironment: string,
  queryTag: String,
  options: KeyValueAny
) => {
  try {
    const response = await axios.post(
      gqlApis[chainEnvironment],
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
