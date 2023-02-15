import { sha256 } from "@cosmjs/crypto";

export function getClaimHash(object: Uint8Array) {
    return sha256(object);
}