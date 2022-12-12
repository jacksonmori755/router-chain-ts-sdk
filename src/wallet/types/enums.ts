import { WalletErrorActionModule } from '../../exceptions';

export enum Wallet {
  Metamask = 'metamask',
  Ledger = 'ledger',
  LedgerLegacy = 'ledger-legacy',
  Keplr = 'keplr',
  WalletConnect = 'wallet-connect',
  Leap = 'leap',
  Cosmostation = 'cosmostation',
  CosmostationEth = 'cosmostation-eth',
}

export enum WalletDeviceType {
  Browser = 'browser',
  Hardware = 'hardware',
  Mobile = 'mobile',
}

export const WalletAction = { ...WalletErrorActionModule };
