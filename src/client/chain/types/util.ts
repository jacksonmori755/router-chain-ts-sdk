import { sha256 } from "@cosmjs/crypto";

export function getClaimHash(object: any) {
    const marshalledClaimHash = JSON.stringify(object)

    const marshalledClaimHash_asU8 = marshalledClaimHash.split("").map(e => e.charCodeAt(0));
    return sha256(new Uint8Array(marshalledClaimHash_asU8));
}
