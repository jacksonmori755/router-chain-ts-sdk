import { TextProposal } from '@routerprotocol/chain-api/cosmos/gov/v1beta1/gov_pb';
import { SoftwareUpgradeProposal } from '@routerprotocol/chain-api/cosmos/upgrade/v1beta1/upgrade_pb';
import { ParameterChangeProposal } from '@routerprotocol/chain-api/cosmos/params/v1beta1/params_pb';

export class ProposalDecomposer {
  static textProposal(content: Uint8Array) {
    return TextProposal.deserializeBinary(content);
  }

  static SoftwareUpgrade(content: Uint8Array) {
    return SoftwareUpgradeProposal.deserializeBinary(content);
  }

  static parametersChange(content: Uint8Array) {
    return ParameterChangeProposal.deserializeBinary(content);
  }
}
