import { ValsetUpdatedClaimHash } from "@routerprotocol/chain-api/attestation/valset_updated_claim_pb";
import { getClaimHash } from "./util";

export function getValsetUpdatedClaimHash(claimHashObject: ValsetUpdatedClaimHash.AsObject) : Uint8Array {
    return getClaimHash(claimHashObject)
}
