import { ValsetUpdatedClaimHash } from '@routerprotocol/chain-api/attestation/valset_updated_claim_pb';
import { BridgeValidator } from '@routerprotocol/chain-api/attestation/bridge_validator_pb';
import { getClaimHash } from './util';

export function getValsetUpdatedClaimHash(
  claimHashObject: ValsetUpdatedClaimHash.AsObject
): Uint8Array {
  const claimHash = new ValsetUpdatedClaimHash();

  let bridgeValidators: Array<BridgeValidator> = claimHashObject.membersList.map(
    validatorObj => {
      const bridgeValidator = new BridgeValidator();
      bridgeValidator.setPower(validatorObj.power);
      bridgeValidator.setEthereumaddress(validatorObj.ethereumaddress);
      return bridgeValidator;
    }
  );
  claimHash.setChainid(claimHashObject.chainid);
  claimHash.setEventnonce(claimHashObject.eventnonce);
  claimHash.setValsetnonce(claimHashObject.valsetnonce);
  claimHash.setBlockheight(claimHashObject.blockheight);
  claimHash.setMembersList(bridgeValidators);
  claimHash.setSourcetxhash(claimHashObject.sourcetxhash);

  return getClaimHash(claimHash.serializeBinary());
}
