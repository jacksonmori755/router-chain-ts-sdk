import { QueryParamsResponse } from '@routerprotocol/chain-api/cosmos/mint/v1beta1/query_pb'
import { MinModuleParams } from '../types/custom/mint'

export class ChainGrpcMintTransformer {
  static moduleParamsResponseToModuleParams(
    response: QueryParamsResponse,
  ): MinModuleParams {
    const params = response.getParams()!

    return params.toObject()
  }
}
