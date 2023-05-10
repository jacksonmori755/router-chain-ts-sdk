/* eslint-disable class-methods-use-this */
import { sleep } from '../../../..';
import { AccountAddress, ChainId, EthereumChainId } from '../../../..';
import {
  ErrorType,
  MetamaskException,
  UnspecifiedErrorCode,
  WalletException,
} from '../../../../exceptions';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { TxRaw } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_pb';
import { DirectSignResponse } from '@cosmjs/proto-signing';
import {
  ConcreteWalletStrategy,
  EthereumWalletStrategyArgs,
  onChainIdChangeCallback,
  WalletStrategyEthereumOptions,
} from '../../types';
import BaseConcreteStrategy from './Base';
import { WalletAction, WalletDeviceType } from '../../../types/enums';
import { Msgs } from '../../../../core';
import { TxToSend } from '../../../../tx-ts/ethermint/types';

export default class WalletConnect extends BaseConcreteStrategy
                 implements ConcreteWalletStrategy {
                 private walletConnectProvider:
                   | WalletConnectProvider
                   | undefined;

                 private readonly ethereumOptions:
                   | WalletStrategyEthereumOptions
                   | undefined;

                 private createWalletConnectProvider() {
                   const { ethereumOptions } = this;

                   if (!ethereumOptions) {
                     throw new WalletException(
                       new Error('Please provide Ethereum options')
                     );
                   }

                   this.walletConnectProvider = new WalletConnectProvider({
                     rpc: {
                       [ethereumOptions.ethereumChainId]:
                         ethereumOptions.rpcUrl,
                     },
                   });
                   this.web3 = new Web3(this.walletConnectProvider as any);
                 }

                 constructor(args: EthereumWalletStrategyArgs) {
                   super(args);
                   this.ethereumOptions = args.ethereumOptions;
                   this.createWalletConnectProvider();
                 }
                 simulateTransaction(
                   _signedTx: TxToSend,
                   _nodeUrl: string
                 ): Promise<any> {
                   throw new Error('Method not implemented.');
                 }
                 broadcastTransaction(
                   _signedTx: TxToSend,
                   _nodeUrl: string
                 ): Promise<any> {
                   throw new Error('Method not implemented.');
                 }
                 simulateSignAndBroadcast(_args: {
                   ethChainId: string;
                   cosmosChainId: string;
                   txMsg: Msgs;
                   nodeUrl: string;
                   memo?: string;
                 }): Promise<any> {
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

                 async getWalletDeviceType(): Promise<WalletDeviceType> {
                   return Promise.resolve(WalletDeviceType.Browser);
                 }

                 private async connect(): Promise<void> {
                   if (!this.walletConnectProvider?.connected) {
                     // WalletConnect seems to have a problem with connecting multiple times with the same instance, hence it's necessary
                     // to create a new one each time user wants to connect
                     this.createWalletConnectProvider();
                     await this.walletConnectProvider?.enable();
                   }
                 }

                 async disconnect(): Promise<void> {
                   await this.walletConnectProvider?.disconnect();
                   // walletConnect will not display QRModal again with the same instance for some reason, so it's necessary to destroy the instance
                   this.createWalletConnectProvider();
                 }

                 async getAddresses(): Promise<string[]> {
                   await this.connect();

                   try {
                     return await this.getWeb3().eth.getAccounts();
                   } catch (e) {
                     throw new MetamaskException(
                       new Error((e as any).message),
                       {
                         code: UnspecifiedErrorCode,
                         type: ErrorType.WalletError,
                         contextModule: WalletAction.GetAccounts,
                       }
                     );
                   }
                 }

                 async confirm(address: AccountAddress): Promise<string> {
                   await this.connect();

                   return Promise.resolve(
                     `0x${Buffer.from(
                       `Confirmation for ${address} at time: ${Date.now()}`
                     ).toString('hex')}`
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
                   await this.connect();

                   try {
                     return await this.walletConnectProvider!.request({
                       method: 'eth_signTypedData',
                       params: [address, eip712json],
                     });
                   } catch (e) {
                     throw new MetamaskException(
                       new Error((e as any).message),
                       {
                         code: UnspecifiedErrorCode,
                         type: ErrorType.WalletError,
                         contextModule: WalletAction.SignTransaction,
                       }
                     );
                   }
                 }

                 async sendEthereumTransaction(
                   transaction: unknown,
                   _options: {
                     address: AccountAddress;
                     ethereumChainId: EthereumChainId;
                   }
                 ): Promise<string> {
                   await this.connect();

                   const transactionConfig = transaction as TransactionConfig;

                   transactionConfig.gas = parseInt(
                     transactionConfig.gas as string,
                     16
                   ).toString(10);
                   transactionConfig.maxFeePerGas = parseInt(
                     transactionConfig.maxFeePerGas as string,
                     16
                   ).toString(10);

                   // walletConnect doesn't seem to support hex format, so it's necessay to convert to decimal
                   try {
                     const txHash = await this.getWeb3().eth.sendTransaction(
                       transactionConfig
                     );
                     return txHash.transactionHash;
                   } catch (e) {
                     throw new MetamaskException(
                       new Error((e as any).message),
                       {
                         code: UnspecifiedErrorCode,
                         type: ErrorType.WalletError,
                         contextModule: WalletAction.SendEthereumTransaction,
                       }
                     );
                   }
                 }

                 // eslint-disable-next-line class-methods-use-this
                 async sendTransaction(
                   _transaction: unknown,
                   _options: { address: AccountAddress; chainId: ChainId }
                 ): Promise<string> {
                   throw new MetamaskException(
                     new Error(
                       'sendTransaction is not supported. WalletConnect only supports sending transaction to Ethereum'
                     ),
                     {
                       code: UnspecifiedErrorCode,
                       type: ErrorType.WalletError,
                       contextModule: WalletAction.SendTransaction,
                     }
                   );
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
                     new Error(
                       'This wallet does not support signing Cosmos transactions'
                     ),
                     {
                       code: UnspecifiedErrorCode,
                       type: ErrorType.WalletError,
                       contextModule: WalletAction.SendTransaction,
                     }
                   );
                 }

                 async getEthereumTransactionReceipt(
                   txHash: string
                 ): Promise<string> {
                   await this.connect();

                   const interval = 1000;
                   const transactionReceiptRetry = async () => {
                     const receipt = await this.walletConnectProvider!.request({
                       method: 'eth_getTransactionReceipt',
                       params: [txHash],
                     });

                     if (!receipt) {
                       await sleep(interval);
                       await transactionReceiptRetry();
                     }

                     return receipt;
                   };

                   try {
                     return await transactionReceiptRetry();
                   } catch (e) {
                     throw new MetamaskException(
                       new Error((e as any).message),
                       {
                         code: UnspecifiedErrorCode,
                         type: ErrorType.WalletError,
                         contextModule:
                           WalletAction.GetEthereumTransactionReceipt,
                       }
                     );
                   }
                 }

                 async getNetworkId(): Promise<string> {
                   await this.connect();

                   try {
                     const result = await this.getWeb3().eth.net.getId();

                     return result.toString();
                   } catch (e) {
                     throw new MetamaskException(
                       new Error((e as any).message),
                       {
                         code: UnspecifiedErrorCode,
                         type: ErrorType.WalletError,
                         contextModule: WalletAction.GetNetworkId,
                       }
                     );
                   }
                 }

                 async getChainId(): Promise<string> {
                   await this.connect();

                   try {
                     const result = await this.getWeb3().eth.getChainId();

                     return result.toString();
                   } catch (e) {
                     throw new MetamaskException(
                       new Error((e as any).message),
                       {
                         code: UnspecifiedErrorCode,
                         type: ErrorType.WalletError,
                         contextModule: WalletAction.GetChainId,
                       }
                     );
                   }
                 }

                 // eslint-disable-next-line class-methods-use-this
                 async getPubKey(): Promise<string> {
                   throw new WalletException(
                     new Error(
                       'You can only fetch PubKey from Cosmos native wallets'
                     )
                   );
                 }

                 onAccountChange(
                   callback: (account: AccountAddress) => void
                 ): void {
                   this.walletConnectProvider?.on('accountsChanged', callback);
                 }
               }
