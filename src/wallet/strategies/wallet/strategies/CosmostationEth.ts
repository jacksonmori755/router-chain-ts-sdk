/* eslint-disable class-methods-use-this */
import {
  AccountAddress,
  ChainId,
  EthereumChainId,
  CosmosChainId,
} from '../../../..';
import {
  UnspecifiedErrorCode,
  WalletException,
  ErrorType,
} from '../../../../exceptions';
import { sleep } from '../../../..';
import { ethereum, InstallError } from '@cosmostation/extension-client';
import Web3 from 'web3';
import { TxRaw } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_pb';
import { DirectSignResponse } from '@cosmjs/proto-signing';
import {
  ConcreteWalletStrategy,
  EthereumWalletStrategyArgs,
  onAccountChangeCallback,
  onChainIdChangeCallback,
} from '../../types';
import BaseConcreteStrategy from './Base';
import { WalletAction, WalletDeviceType } from '../../../types/enums';
import { UnwrappedPromise } from '../../../types';
import {
  Msgs,
  Eip712ConvertTxArgs,
  Eip712ConvertFeeArgs,
} from '../../../../core';
import { TxToSend, TxContext } from '../../../../tx-ts/ethermint/types';

export default class CosmostationEth extends BaseConcreteStrategy
  implements ConcreteWalletStrategy {
  private ethereum?: UnwrappedPromise<ReturnType<typeof ethereum>>;

  constructor(args: EthereumWalletStrategyArgs) {
    super(args);
    this.chainId = args.chainId || CosmosChainId.Router;
  }
  simulateTransaction(_signedTx: TxToSend, _nodeUrl: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  broadcastTransaction(_signedTx: TxToSend, _nodeUrl: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  simulateSignAndBroadcast(
    _context: TxContext,
    _eipData: {
      msgs: Msgs | Msgs[]; // eslint-disable-next-line class-methods-use-this
      // eslint-disable-next-line class-methods-use-this
      tx: Eip712ConvertTxArgs;
      fee?: Eip712ConvertFeeArgs | undefined;
      ethereumChainId: EthereumChainId;
    },
    _nodeUrl: string
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
  onAccountChange?(_callback: onAccountChangeCallback): void {
    throw new Error('Method not implemented.');
  }
  onChainIdChange?(_callback: onChainIdChangeCallback): void {
    throw new Error('Method not implemented.');
  }
  cancelOnChainIdChange?(): void {
    throw new Error('Method not implemented.');
  }
  cancelOnAccountChange?(): void {
    throw new Error('Method not implemented.');
  }
  cancelAllEvents?(): void {
    throw new Error('Method not implemented.');
  }
  disconnect?(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getWalletDeviceType(): Promise<WalletDeviceType> {
    return Promise.resolve(WalletDeviceType.Browser);
  }

  async getAddresses(): Promise<string[]> {
    const ethereum = await this.getEthereum();

    try {
      return (await ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];
    } catch (e) {
      if ((e as any).code === 4001) {
        throw new WalletException(new Error('The user rejected the request'), {
          code: UnspecifiedErrorCode,
          type: ErrorType.WalletError,
          contextModule: WalletAction.GetAccounts,
        });
      }

      throw new WalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetAccounts,
      });
    }
  }

  async confirm(address: AccountAddress): Promise<string> {
    return Promise.resolve(
      `0x${Buffer.from(
        `Confirmation for ${address} at time: ${Date.now()}`
      ).toString('hex')}`
    );
  }

  async sendEthereumTransaction(
    transaction: unknown,
    _options: {
      address: AccountAddress;
      ethereumChainId: EthereumChainId;
    }
  ): Promise<string> {
    const ethereum = await this.getEthereum();

    try {
      return (await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      })) as string;
    } catch (e) {
      throw new WalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SendEthereumTransaction,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async sendTransaction(
    _transaction: unknown,
    _options: { address: AccountAddress; chainId: ChainId }
  ): Promise<string> {
    throw new WalletException(
      new Error(
        'sendTransaction is not supported. Metamask only supports sending transaction to Ethereum'
      ),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SendTransaction,
      }
    );
  }

  /** @deprecated */
  async signTransaction(
    eip712json: string,
    address: AccountAddress
  ): Promise<string> {
    return this.signEip712TypedData(eip712json, address);
  }

  async signEip712TypedData(
    eip712json: string,
    address: AccountAddress
  ): Promise<string> {
    const ethereum = await this.getEthereum();

    try {
      return (await ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [address, eip712json],
      })) as string;
    } catch (e) {
      throw new WalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SignTransaction,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async signCosmosTransaction(
    _transaction: {
      txRaw: TxRaw;
      accountNumber: number;
      chainId: string;
    },
    _address: AccountAddress
  ): Promise<DirectSignResponse> {
    throw new WalletException(
      new Error('This wallet does not support signing Cosmos transactions'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SendTransaction,
      }
    );
  }

  async getNetworkId(): Promise<string> {
    const ethereum = await this.getEthereum();

    try {
      return (await ethereum.request({
        method: 'net_version',
      })) as string;
    } catch (e) {
      throw new WalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetNetworkId,
      });
    }
  }

  async getChainId(): Promise<string> {
    const ethereum = await this.getEthereum();

    try {
      return (await ethereum.request({
        method: 'eth_chainId',
      })) as string;
    } catch (e) {
      throw new WalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetChainId,
      });
    }
  }

  async getEthereumTransactionReceipt(txHash: string): Promise<string> {
    const ethereum = await this.getEthereum();

    const interval = 1000;
    const transactionReceiptRetry = async () => {
      const receipt = await ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [txHash],
      });

      if (!receipt) {
        await sleep(interval);
        await transactionReceiptRetry();
      }

      return receipt as string;
    };

    try {
      return await transactionReceiptRetry();
    } catch (e) {
      throw new WalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetEthereumTransactionReceipt,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getPubKey(): Promise<string> {
    throw new WalletException(
      new Error('You can only fetch PubKey from Cosmos native wallets')
    );
  }

  private async getEthereum(): Promise<ReturnType<typeof ethereum>> {
    if (this.ethereum) {
      return this.ethereum;
    }

    try {
      const provider = await ethereum();

      this.web3 = new Web3(provider);
      this.ethereum = provider;

      return provider;
    } catch (e) {
      if (e instanceof InstallError) {
        throw new WalletException(
          new Error('Please install the Cosmostation extension'),
          {
            code: UnspecifiedErrorCode,
            type: ErrorType.WalletNotInstalledError,
          }
        );
      }

      throw new WalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
      });
    }
  }
}
