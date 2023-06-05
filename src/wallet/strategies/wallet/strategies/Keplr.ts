/* eslint-disable class-methods-use-this */
import {
  AccountAddress,
  ChainId,
  EthereumChainId,
  CosmosChainId,
} from '../../../../'
import {
  createCosmosSignDocFromTransaction,
  createTxRawFromSigResponse,
} from '../../../../'
import type { DirectSignResponse } from '@cosmjs/proto-signing'
import {
  UnspecifiedErrorCode,
  CosmosWalletException,
  ErrorType,
  TransactionException,
} from '../../../../exceptions'
import { TxRaw } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_pb'
import { KeplrWallet } from '../../../wallets/keplr'
import { ConcreteWalletStrategy, onAccountChangeCallback, onChainIdChangeCallback } from '../../types'
import BaseConcreteStrategy from './Base'
import { WalletAction, WalletDeviceType } from '../../../types/enums'
import { Msgs } from '../../../../core'
import { TxToSend } from '../../../../tx-ts/ethermint/types'

export default class Keplr
  extends BaseConcreteStrategy
  implements ConcreteWalletStrategy
{
  private keplrWallet: KeplrWallet

  constructor(args: { chainId: ChainId }) {
    super(args)
    this.chainId = args.chainId || CosmosChainId.Router
    this.keplrWallet = new KeplrWallet(args.chainId)
  }
  simulateTransaction(_signedTx: TxToSend, _nodeUrl: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
  broadcastTransaction(_signedTx: TxToSend, _nodeUrl: string): Promise<any> {
    throw new Error('Method not implemented.')
  }
  simulateSignAndBroadcast(_args: {
                   ethChainId: string;
                   cosmosChainId: string;
                   txMsg: Msgs;
                   nodeUrl: string;
                   memo?: string;
                 }): Promise<any> {
    throw new Error('Method not implemented.')
  }
  onAccountChange?(_callback: onAccountChangeCallback): void {
    throw new Error('Method not implemented.')
  }
  onChainIdChange?(_callback: onChainIdChangeCallback): void {
    throw new Error('Method not implemented.')
  }
  cancelOnChainIdChange?(): void {
    throw new Error('Method not implemented.')
  }
  cancelOnAccountChange?(): void {
    throw new Error('Method not implemented.')
  }
  cancelAllEvents?(): void {
    throw new Error('Method not implemented.')
  }
  disconnect?(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getWalletDeviceType(): Promise<WalletDeviceType> {
    const keplrWallet = this.getKeplrWallet()
    const key = await keplrWallet.getKey()

    return key.isNanoLedger
      ? Promise.resolve(WalletDeviceType.Hardware)
      : Promise.resolve(WalletDeviceType.Browser)
  }

  async getAddresses(): Promise<string[]> {
    const keplrWallet = this.getKeplrWallet()

    try {
      if (!(await keplrWallet.checkChainIdSupport())) {
        await keplrWallet.experimentalSuggestChain()
      }

      const accounts = await keplrWallet.getAccounts()

      return accounts.map((account) => account.address)
    } catch (e) {
      throw new CosmosWalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetAccounts,
      })
    }
  }

  async confirm(address: AccountAddress): Promise<string> {
    return Promise.resolve(
      `0x${Buffer.from(
        `Confirmation for ${address} at time: ${Date.now()}`,
      ).toString('hex')}`,
    )
  }

  // eslint-disable-next-line class-methods-use-this
  async sendEthereumTransaction(
    _transaction: unknown,
    _options: { address: AccountAddress; ethereumChainId: EthereumChainId },
  ): Promise<string> {
    throw new CosmosWalletException(
      new Error(
        'sendEthereumTransaction is not supported. Keplr only supports sending cosmos transactions',
      ),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SendEthereumTransaction,
      },
    )
  }

  async sendTransaction(
    transaction: DirectSignResponse | TxRaw,
    _options: { address: AccountAddress; chainId: ChainId },
  ): Promise<string> {
    const { keplrWallet } = this
    const txRaw =
      transaction instanceof TxRaw
        ? transaction
        : createTxRawFromSigResponse(transaction)

    try {
      return await keplrWallet.waitTxBroadcasted(
        await keplrWallet.broadcastTx(txRaw),
      )
    } catch (e) {
      throw new TransactionException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.ChainError,
        contextModule: WalletAction.SendTransaction,
      })
    }
  }

  /** @deprecated */
  async signTransaction(
    transaction: { txRaw: TxRaw; accountNumber: number; chainId: string },
    routerAddress: AccountAddress,
  ) {
    return this.signCosmosTransaction(transaction, routerAddress)
  }

  async signCosmosTransaction(
    transaction: { txRaw: TxRaw; accountNumber: number; chainId: string },
    routerAddress: AccountAddress,
  ) {
    const keplrWallet = this.getKeplrWallet()
    const signer = await keplrWallet.getOfflineSigner()
    const signDoc = createCosmosSignDocFromTransaction(transaction)

    try {
      return signer.signDirect(routerAddress, signDoc)
    } catch (e) {
      throw new CosmosWalletException(new Error((e as any).message), {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SendTransaction,
      })
    }
  }

  async signEip712TypedData(
    _transaction: string,
    _address: AccountAddress,
  ): Promise<string> {
    throw new CosmosWalletException(
      new Error('This wallet does not support signing Ethereum transactions'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.SendTransaction,
      },
    )
  }

  async getNetworkId(): Promise<string> {
    throw new CosmosWalletException(
      new Error('getNetworkId is not supported on Keplr'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetNetworkId,
      },
    )
  }

  async getChainId(): Promise<string> {
    throw new CosmosWalletException(
      new Error('getChainId is not supported on Keplr'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetChainId,
      },
    )
  }

  async getEthereumTransactionReceipt(_txHash: string): Promise<string> {
    throw new CosmosWalletException(
      new Error('getEthereumTransactionReceipt is not supported on Keplr'),
      {
        code: UnspecifiedErrorCode,
        type: ErrorType.WalletError,
        contextModule: WalletAction.GetEthereumTransactionReceipt,
      },
    )
  }

  async getPubKey(): Promise<string> {
    const keplrWallet = this.getKeplrWallet()
    const key = await keplrWallet.getKey()

    return Buffer.from(key.pubKey).toString('base64')
  }

  private getKeplrWallet(): KeplrWallet {
    const { keplrWallet } = this

    if (!keplrWallet) {
      throw new CosmosWalletException(
        new Error('Please install the Keplr wallet extension'),
        {
          code: UnspecifiedErrorCode,
          type: ErrorType.WalletNotInstalledError,
          contextModule: WalletAction.SignTransaction,
        },
      )
    }

    return keplrWallet
  }
}
