import Eip1993Provider from 'eip1193-provider';
import HDNode from 'hdkey';

export interface Eip1993ProviderWithMetamask extends Eip1993Provider {
  removeAllListeners(): void;
  isMetaMask: boolean;
}
//@ts-ignore
export interface WindowWithEip1193Provider extends Window {
  ethereum: Eip1993ProviderWithMetamask;
}
//@ts-ignore
export interface WindowWithLedgerSupport extends Window {
  Websocket?: any;
}

export interface LedgerWalletInfo {
  address: string;
  baseDerivationPath: string;
  derivationPath: string;
  hdKey: HDNode;
}

export enum LedgerDerivationPathType {
  LedgerLive = 'ledger-live',
  LedgerMew = 'ledger-mew',
}
