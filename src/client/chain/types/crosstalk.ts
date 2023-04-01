import { CrossTalkRequestClaimHash } from '@routerprotocol/chain-api/crosstalk/cross_talk_request_pb';
import { CrossTalkAckRequestClaimHash } from '@routerprotocol/chain-api/crosstalk/cross_talk_ack_request_pb';
import { getClaimHash } from './util';

export function getCrossTalkRequestClaimHash(
  claimHashObject: CrossTalkRequestClaimHash.AsObject
): Uint8Array {
  const claimHash = new CrossTalkRequestClaimHash();

  claimHash.setEventnonce(claimHashObject.eventnonce);
  claimHash.setBlockheight(claimHashObject.blockheight);
  claimHash.setSourcechaintype(claimHashObject.sourcechaintype);
  claimHash.setSourcechainid(claimHashObject.sourcechainid);
  claimHash.setSourcetxhash(claimHashObject.sourcetxhash);
  claimHash.setDestinationchaintype(claimHashObject.destinationchaintype);
  claimHash.setDestinationchainid(claimHashObject.destinationchainid);
  claimHash.setDestinationgaslimit(claimHashObject.destinationgaslimit);
  claimHash.setDestinationgasprice(claimHashObject.destinationgasprice);
  claimHash.setRequestsender(claimHashObject.requestsender);
  claimHash.setRequesttxorigin(claimHashObject.requesttxorigin);
  claimHash.setIsreadcall(claimHashObject.isreadcall);
  claimHash.setRequestnonce(claimHashObject.requestnonce);
  claimHash.setIsatomic(claimHashObject.isatomic);
  claimHash.setExpirytimestamp(claimHashObject.expirytimestamp);
  claimHash.setDestcontractaddressesList(
    claimHashObject.destcontractaddressesList
  );
  claimHash.setDestcontractpayloadsList(
    claimHashObject.destcontractpayloadsList
  );
  claimHash.setAcktype(claimHashObject.acktype);
  claimHash.setAckgaslimit(claimHashObject.ackgaslimit);
  claimHash.setAckgasprice(claimHashObject.ackgasprice);
  //claimHash.setFeepayer(claimHashObject.feepayer)

  return getClaimHash(claimHash.serializeBinary());
}

export function getCrossTalkAckRequestClaimHash(
  claimHashObject: CrossTalkAckRequestClaimHash.AsObject
): Uint8Array {
  const claimHash = new CrossTalkAckRequestClaimHash();

  claimHash.setEventnonce(claimHashObject.eventnonce);
  claimHash.setBlockheight(claimHashObject.blockheight);
  claimHash.setRelayerrouteraddress(claimHashObject.relayerrouteraddress);
  claimHash.setSourcechaintype(claimHashObject.sourcechaintype);
  claimHash.setSourcechainid(claimHashObject.sourcechainid);
  claimHash.setChaintype(claimHashObject.chaintype);
  claimHash.setChainid(claimHashObject.chainid);
  claimHash.setDestinationtxhash(claimHashObject.destinationtxhash);
  claimHash.setEventidentifier(claimHashObject.eventidentifier);
  claimHash.setCrosstalkrequestsender(claimHashObject.crosstalkrequestsender);
  claimHash.setCrosstalknonce(claimHashObject.crosstalknonce);
  claimHash.setContractackresponses(claimHashObject.contractackresponses);
  claimHash.setExecode(claimHashObject.execode);
  claimHash.setExecstatus(claimHashObject.execstatus);
  claimHash.setExecflagsList(claimHashObject.execflagsList);
  claimHash.setExecdataList(claimHashObject.execdataList);

  return getClaimHash(claimHash.serializeBinary());
}

export function getMsgCrossTalkRequestClaimHash(
  claimHashObject: CrossTalkRequestClaimHash.AsObject
): Uint8Array {
  const claimHash = new CrossTalkRequestClaimHash();

  claimHash.setEventnonce(claimHashObject.eventnonce);
  claimHash.setBlockheight(claimHashObject.blockheight);
  claimHash.setSourcechaintype(claimHashObject.sourcechaintype);
  claimHash.setSourcechainid(claimHashObject.sourcechainid);
  claimHash.setSourcetxhash(claimHashObject.sourcetxhash);
  claimHash.setDestinationchaintype(claimHashObject.destinationchaintype);
  claimHash.setDestinationchainid(claimHashObject.destinationchainid);
  claimHash.setDestinationgaslimit(claimHashObject.destinationgaslimit);
  claimHash.setDestinationgasprice(claimHashObject.destinationgasprice);
  claimHash.setRequestsender(claimHashObject.requestsender);
  claimHash.setRequesttxorigin(claimHashObject.requesttxorigin);
  claimHash.setIsreadcall(claimHashObject.isreadcall);
  claimHash.setRequestnonce(claimHashObject.requestnonce);
  claimHash.setIsatomic(claimHashObject.isatomic);
  claimHash.setExpirytimestamp(claimHashObject.expirytimestamp);
  claimHash.setDestcontractaddressesList(
    claimHashObject.destcontractaddressesList
  );
  claimHash.setDestcontractpayloadsList(
    claimHashObject.destcontractpayloadsList
  );
  claimHash.setAcktype(claimHashObject.acktype);
  claimHash.setAckgaslimit(claimHashObject.ackgaslimit);
  claimHash.setAckgasprice(claimHashObject.ackgasprice);
  //claimHash.setFeepayer(claimHashObject.feepayer)

  return getClaimHash(claimHash.serializeBinary());
}

export function getMsgCrossTalkAckRequestClaimHash(
  claimHashObject: CrossTalkAckRequestClaimHash.AsObject
): Uint8Array {
  const claimHash = new CrossTalkAckRequestClaimHash();

  claimHash.setEventnonce(claimHashObject.eventnonce);
  claimHash.setBlockheight(claimHashObject.blockheight);
  claimHash.setRelayerrouteraddress(claimHashObject.relayerrouteraddress);
  claimHash.setSourcechaintype(claimHashObject.sourcechaintype);
  claimHash.setSourcechainid(claimHashObject.sourcechainid);
  claimHash.setChaintype(claimHashObject.chaintype);
  claimHash.setChainid(claimHashObject.chainid);
  claimHash.setDestinationtxhash(claimHashObject.destinationtxhash);
  claimHash.setEventidentifier(claimHashObject.eventidentifier);
  claimHash.setCrosstalkrequestsender(claimHashObject.crosstalkrequestsender);
  claimHash.setCrosstalknonce(claimHashObject.crosstalknonce);
  claimHash.setContractackresponses(claimHashObject.contractackresponses);
  claimHash.setExecode(claimHashObject.execode);
  claimHash.setExecstatus(claimHashObject.execstatus);
  claimHash.setExecflagsList(claimHashObject.execflagsList);
  claimHash.setExecdataList(claimHashObject.execdataList);

  return getClaimHash(claimHash.serializeBinary());
}

export function getMsgCrossTalkAckReceiptClaimHash(
  claimHashObject: CrossTalkAckRequestClaimHash.AsObject
): Uint8Array {
  const claimHash = new CrossTalkAckRequestClaimHash();

  claimHash.setEventnonce(claimHashObject.eventnonce);
  claimHash.setBlockheight(claimHashObject.blockheight);
  claimHash.setRelayerrouteraddress(claimHashObject.relayerrouteraddress);
  claimHash.setSourcechaintype(claimHashObject.sourcechaintype);
  claimHash.setSourcechainid(claimHashObject.sourcechainid);
  claimHash.setChaintype(claimHashObject.chaintype);
  claimHash.setChainid(claimHashObject.chainid);
  claimHash.setDestinationtxhash(claimHashObject.destinationtxhash);
  claimHash.setEventidentifier(claimHashObject.eventidentifier);
  claimHash.setCrosstalkrequestsender(claimHashObject.crosstalkrequestsender);
  claimHash.setCrosstalknonce(claimHashObject.crosstalknonce);
  claimHash.setContractackresponses(claimHashObject.contractackresponses);
  claimHash.setExecode(claimHashObject.execode);
  claimHash.setExecstatus(claimHashObject.execstatus);
  claimHash.setExecflagsList(claimHashObject.execflagsList);
  claimHash.setExecdataList(claimHashObject.execdataList);

  return getClaimHash(claimHash.serializeBinary());
}
