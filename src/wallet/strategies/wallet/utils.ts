import { Wallet } from '../../types/enums';

export const isEthWallet = (wallet: Wallet): boolean =>
  [Wallet.Metamask, Wallet.Ledger, Wallet.CosmostationEth].includes(wallet);
