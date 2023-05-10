/* eslint-disable class-methods-use-this */
import {
  BaseAccount,
  BigNumberInBase,
  broadcastRawTx,
  ChainRestAuthApi,
  createTxRawForBroadcast,
  Eip712ConvertFeeArgs,
  Eip712ConvertTxArgs,
  getEtherMintTxPayload,
  getRouterSignerAddress,
  hexToBase64,
  hexToBuff,
  isServerSide,
  Msgs,
  recoverTypedSignaturePubKey,
  ROUTER_DENOM,
  simulateRawTx,
  sleep,
} from '../../../..';
import { AccountAddress, ChainId, EthereumChainId } from '../../../..';
import {
  WalletException,
  ErrorType,
  MetamaskException,
  UnspecifiedErrorCode,
} from '../../../../exceptions';
import { DirectSignResponse } from '@cosmjs/proto-signing';
import { TxRaw } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_pb';
import {
  ConcreteWalletStrategy,
  EthereumWalletStrategyArgs,
} from '../../types';
import {
  Eip1993ProviderWithMetamask,
  WindowWithEip1193Provider,
} from '../types';
import BaseConcreteStrategy from './Base';
import { WalletAction, WalletDeviceType } from '../../../types/enums';
import { TxContext, TxToSend } from '../../../../tx-ts/ethermint/types';
import { GAS_LIMIT_MULTIPLIER, ROUTER_DEFAULT_GAS_PRICE } from '../../../utils';
//import { ethers } from 'ethers';

const $window = ((isServerSide()
  ? {}
  : //@ts-ignore
    window) as unknown) as WindowWithEip1193Provider;

export default class Metamask extends BaseConcreteStrategy
                 implements ConcreteWalletStrategy {
                 private ethereum: Eip1993ProviderWithMetamask;

                 constructor(args: EthereumWalletStrategyArgs) {
                   super(args);
                   this.ethereum = $window.ethereum;
                 }

                 async getWalletDeviceType(): Promise<WalletDeviceType> {
                   return Promise.resolve(WalletDeviceType.Browser);
                 }

                 async getAddresses(): Promise<string[]> {
                   const ethereum = this.getEthereum();

                   try {
                     return await ethereum.request({
                       method: 'eth_requestAccounts',
                     });
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

                 // eslint-disable-next-line class-methods-use-this
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
                   const ethereum = this.getEthereum();

                   try {
                     return await ethereum.request({
                       method: 'eth_sendTransaction',
                       params: [transaction],
                     });
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
                   const ethereum = this.getEthereum();

                   try {
                     return await ethereum.request({
                       method: 'eth_signTypedData_v4',
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

                 async simulateTransaction(
                   signedTx: TxToSend,
                   nodeUrl: string
                 ) {
                   return simulateRawTx(signedTx, nodeUrl);
                 }

                 async broadcastTransaction(
                   signedTx: TxToSend,
                   nodeUrl: string
                 ) {
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
                 }) {
                   //Account Info
                   const parsedEthChainId = ethChainId.startsWith('0x')
                     ? parseInt(ethChainId, 16)
                     : parseInt(ethChainId);
                   const userAccountInfo = await new ChainRestAuthApi(
                     nodeUrl
                   ).fetchAccount(
                     getRouterSignerAddress(this.ethereum.selectedAddress)
                   );
                   const baseAccount = BaseAccount.fromRestApi(userAccountInfo);
                   const accountDetails = baseAccount.toAccountDetails();
                   const context: TxContext = {
                     chain: {
                       chainId: parsedEthChainId,
                       cosmosChainId: cosmosChainId,
                     },
                     sender: {
                       accountAddress: getRouterSignerAddress(
                         this.ethereum.selectedAddress
                       ),
                       sequence: accountDetails.sequence,
                       accountNumber: accountDetails.accountNumber,
                       pubkey: accountDetails.pubKey?.key ?? '',
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
                         this.ethereum.selectedAddress
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
                         amount: new BigNumberInBase(ROUTER_DEFAULT_GAS_PRICE)
                           .times(
                             parseInt(
                               (
                                 parseInt(
                                   simulationResponse.gas_info.gas_used
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
                         parseInt(simulationResponse.gas_info.gas_used) *
                         GAS_LIMIT_MULTIPLIER
                       ).toString()
                     ).toString(),
                     feePayer:
                       eipData.fee?.feePayer ??
                       getRouterSignerAddress(this.ethereum.selectedAddress),
                   };
                   eipData.fee = simulatedFee;
                   const txPayload = getEtherMintTxPayload(context, eipData);
                   const signature = await this.signEip712TypedData(
                     JSON.stringify(txPayload.eipToSign),
                     this.ethereum.selectedAddress
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

                 async getNetworkId(): Promise<string> {
                   const ethereum = this.getEthereum();

                   try {
                     return ethereum.request({ method: 'net_version' });
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
                   const ethereum = this.getEthereum();

                   try {
                     return ethereum.request({ method: 'eth_chainId' });
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

                 async getEthereumTransactionReceipt(
                   txHash: string
                 ): Promise<string> {
                   const ethereum = this.getEthereum();

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

                 // eslint-disable-next-line class-methods-use-this
                 async getPubKey(): Promise<string> {
                   throw new WalletException(
                     new Error(
                       'You can only fetch PubKey from Cosmos native wallets'
                     )
                   );
                 }

                 onChainIdChanged(callback: () => void): void {
                   const { ethereum } = this;

                   if (!ethereum) {
                     return;
                   }

                   ethereum.on('chainChanged', callback);
                 }

                 onAccountChange(
                   callback: (account: AccountAddress) => void
                 ): void {
                   const { ethereum } = this;

                   if (!ethereum) {
                     return;
                   }

                   ethereum.on('accountsChanged', callback);
                 }

                 cancelOnChainIdChange(): void {
                   const { ethereum } = this;

                   if (ethereum) {
                     // ethereum.removeListener('chainChanged', handler)
                   }
                 }

                 cancelOnAccountChange(): void {
                   const { ethereum } = this;

                   if (ethereum) {
                     // ethereum.removeListener('chainChanged', handler)
                   }
                 }

                 cancelAllEvents(): void {
                   const { ethereum } = this;

                   if (ethereum) {
                     ethereum.removeAllListeners();
                   }
                 }

                 private getEthereum(): Eip1993ProviderWithMetamask {
                   const { ethereum } = this;

                   if (!ethereum) {
                     throw new MetamaskException(
                       new Error(
                         'Please install the Metamask wallet extension.'
                       ),
                       {
                         code: UnspecifiedErrorCode,
                         type: ErrorType.WalletNotInstalledError,
                         contextModule: WalletAction.GetAccounts,
                       }
                     );
                   }

                   return ethereum;
                 }
               }
