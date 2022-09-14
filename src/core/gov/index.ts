export { default as MsgVote } from './msgs/MsgVote';
export { default as MsgGovDeposit } from './msgs/MsgDeposit';
import MsgSubmitTextProposal from './msgs/MsgSubmitTextProposal';

export type MsgSubmitProposal = MsgSubmitTextProposal;

export { MsgSubmitTextProposal };

export * from './ProposalContentDecomposer';
