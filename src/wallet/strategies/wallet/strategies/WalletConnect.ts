/* eslint-disable class-methods-use-this */
import {
  BaseAccount,
  BigNumberInBase,
  broadcastRawTx,
  ChainRestAuthApi,
  createTxRawForBroadcast,
  getEtherMintTxPayload,
  getRouterSignerAddress,
  hexToBase64,
  hexToBuff,
  ROUTER_DENOM,
  simulateRawTx,
  sleep,
} from '../../../..';
import {
  AccountAddress,
  ChainId,
  EthereumChainId,
  recoverTypedSignaturePubKey,
} from '../../../..';
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
import {
  Eip712ConvertFeeArgs,
  Eip712ConvertTxArgs,
  Msgs,
} from '../../../../core';
import { TxContext, TxToSend } from '../../../../tx-ts/ethermint/types';
import { GAS_LIMIT_MULTIPLIER, ROUTER_DEFAULT_GAS_PRICE } from '../../../utils';

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
                   signedTx: TxToSend,
                   nodeUrl: string
                 ): Promise<any> {
                   return simulateRawTx(signedTx, nodeUrl);
                 }
                 broadcastTransaction(
                   signedTx: TxToSend,
                   nodeUrl: string
                 ): Promise<any> {
                   return broadcastRawTx(signedTx, nodeUrl);
                 }
                 async simulateSignAndBroadcast({
                   ethChainId,
                   cosmosChainId,
                   txMsg,
                   nodeUrl,
                   memo,
                 }: {
                   ethChainId: string;
                   cosmosChainId: string;
                   txMsg: Msgs;
                   nodeUrl: string;
                   memo?: string;
                 }): Promise<any> {
                                    //Account Info
                                    const parsedEthChainId = ethChainId.startsWith(
                                      '0x'
                                    )
                                      ? parseInt(ethChainId, 16)
                                      : parseInt(ethChainId);
                                    const userAccountInfo = await new ChainRestAuthApi(
                                      nodeUrl
                                    ).fetchAccount(
                                      getRouterSignerAddress(
                                        this.walletConnectProvider
                                          ?.selectedAddress
                                      )
                                    );
                                    const baseAccount = BaseAccount.fromRestApi(
                                      userAccountInfo
                                    );
                                    const accountDetails = baseAccount.toAccountDetails();
                                    const context: TxContext = {
                                      chain: {
                                        chainId: parsedEthChainId,
                                        cosmosChainId: cosmosChainId,
                                      },
                                      sender: {
                                        accountAddress: getRouterSignerAddress(
                                          this.walletConnectProvider
                                            ?.selectedAddress
                                        ),
                                        sequence: accountDetails.sequence,
                                        accountNumber:
                                          accountDetails.accountNumber,
                                        pubkey:
                                          accountDetails.pubKey?.key ?? '',
                                      },
                                      memo: memo ?? '',
                                    };

                                    //EIP DATA
                                    const eipData: {
                                      msgs: Msgs | Msgs[];
                                      tx: Eip712ConvertTxArgs;
                                      fee?: Eip712ConvertFeeArgs;
                                      ethereumChainId: EthereumChainId;
                                    } = {
                                      msgs: [txMsg],
                                      tx: {
                                        accountNumber: accountDetails.accountNumber.toString(),
                                        sequence: accountDetails.sequence.toString(),
                                        chainId: cosmosChainId,
                                      },
                                      ethereumChainId: parsedEthChainId,
                                      fee: {
                                        feePayer: getRouterSignerAddress(
                                          this.walletConnectProvider
                                            ?.selectedAddress
                                        ),
                                      },
                                    };
                                    // Simulationx
                                    const simulatedTxPayload = getEtherMintTxPayload(
                                      context,
                                      eipData
                                    );
                                    const simulatedTx = createTxRawForBroadcast(
                                      simulatedTxPayload.signDirect.body.toBinary(),
                                      simulatedTxPayload.signDirect.authInfo.toBinary(),
                                      [new Uint8Array(2)]
                                    );
                                    const simulationResponse = await this.simulateTransaction(
                                      simulatedTx,
                                      nodeUrl
                                    );
                                    const simulatedFee = {
                                      amount: [
                                        {
                                          amount: new BigNumberInBase(
                                            ROUTER_DEFAULT_GAS_PRICE
                                          )
                                            .times(
                                              parseInt(
                                                (
                                                  parseInt(
                                                    simulationResponse.gas_info
                                                      .gas_used
                                                  ) * GAS_LIMIT_MULTIPLIER
                                                ).toString()
                                              )
                                            )
                                            .toString(),
                                          denom: ROUTER_DENOM,
                                        },
                                      ],
                                      gas: parseInt(
                                        (
                                          parseInt(
                                            simulationResponse.gas_info.gas_used
                                          ) * GAS_LIMIT_MULTIPLIER
                                        ).toString()
                                      ).toString(),
                                      feePayer:
                                        eipData.fee?.feePayer ??
                                        getRouterSignerAddress(
                                          this.walletConnectProvider
                                            ?.selectedAddress
                                        ),
                                    };
                                    eipData.fee = simulatedFee;
                                    const txPayload = getEtherMintTxPayload(
                                      context,
                                      eipData
                                    );
                                    const signature = await this.signEip712TypedData(
                                      JSON.stringify(txPayload.eipToSign),
                                      this.walletConnectProvider
                                        ?.selectedAddress
                                    );
                                    const signatureBytes = hexToBuff(signature);
                                    const publicKeyHex = recoverTypedSignaturePubKey(
                                      txPayload.eipToSign,
                                      signature
                                    );
                                    const publicKey = hexToBase64(publicKeyHex);
                                    context.sender.pubkey = publicKey;
                                    const txPayloadWithPubKey = getEtherMintTxPayload(
                                      context,
                                      eipData
                                    );
                                    const { signDirect } = txPayloadWithPubKey;
                                    const bodyBytes = signDirect.body.toBinary();
                                    const authInfoBytes = signDirect.authInfo.toBinary();
                                    const txRawToSend = createTxRawForBroadcast(
                                      bodyBytes,
                                      authInfoBytes,
                                      [signatureBytes]
                                    );
                                    const broadcastResponse = await this.broadcastTransaction(
                                      txRawToSend,
                                      nodeUrl
                                    );
                                    return broadcastResponse;
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
                     return await this.walletConnectProvider?.request({
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
