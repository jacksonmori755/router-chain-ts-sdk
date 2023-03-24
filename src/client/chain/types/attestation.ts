import { ValsetUpdatedClaimHash } from "@routerprotocol/chain-api/attestation/valset_updated_claim_pb";
import { BridgeValidator } from "@routerprotocol/chain-api/attestation/bridge_validator_pb";
import { getClaimHash } from "./util";

/**
 * Get ValsetUpdated ClaimHash
 * @param valset 
 * @returns 
 */
export function getValsetUpdatedClaimHash(valset: ValsetUpdatedClaimHash.AsObject) : Uint8Array {
    const claimHash = new ValsetUpdatedClaimHash();

    let bridgeValidators: Array<BridgeValidator> = 
        valset.membersList.map(
            validatorObj => {
                const bridgeValidator = new BridgeValidator();
                bridgeValidator.setPower(validatorObj.power);
                bridgeValidator.setEthereumaddress(validatorObj.ethereumaddress);
                return bridgeValidator
            }
        )

    claimHash.setChaintype(valset.chaintype)
    claimHash.setChainid(valset.chainid)
    claimHash.setEventnonce(valset.eventnonce)
    claimHash.setValsetnonce(valset.valsetnonce)
    claimHash.setBlockheight(valset.blockheight)
    claimHash.setMembersList(bridgeValidators)
    claimHash.setSourcetxhash(valset.sourcetxhash)

    return getClaimHash(claimHash.serializeBinary())
}
