/* eslint-disable class-methods-use-this */
import type { Keplr as Leap } from '@keplr-wallet/types'
import type { OfflineDirectSigner } from '@cosmjs/proto-signing'
import { BroadcastMode } from '@cosmjs/launchpad'
import type { TxRaw } from '@routerprotocol/chain-api/cosmos/tx/v1beta1/tx_pb'
import {
  ChainId,
  CosmosChainId,
  TestnetCosmosChainId,
} from '../../..'
import { TxRestClient } from '../../..'
import {
  CosmosWalletException,
  ErrorType,
  TransactionException,
  UnspecifiedErrorCode,
  WalletErrorActionModule,
} from '../../../exceptions'
import { getEndpointsFromChainId } from '../../..'

//@ts-ignore
const $window = (typeof window !== 'undefined' ? window : {}) as Window & {
  leap?: Leap
}

export class LeapWallet {
  private chainId: CosmosChainId | TestnetCosmosChainId | ChainId

  constructor(chainId: CosmosChainId | TestnetCosmosChainId | ChainId) {
    this.chainId = chainId
  }

  async getLeapWallet() {
    const { chainId } = this
    const leap = this.getLeap()

    try {
      await leap.enable(chainId)

      return leap as Leap
    } catch (e) {
      throw new CosmosWalletException(new Error((e as any).message))
    }
  }

  async getAccounts() {
    const { chainId } = this
    const leap = this.getLeap()

    try {
      return leap.getOfflineSigner(chainId).getAccounts()
    } catch (e) {
      throw new CosmosWalletException(new Error((e as any).message), {
        contextModule: WalletErrorActionModule.GetAccounts,
      })
    }
  }

  async getKey(): Promise<{
    name: string
    algo: string
    pubKey: Uint8Array
    address: Uint8Array
    bech32Address: string
  }> {
    const leap = await this.getLeapWallet()

    try {
      return leap.getKey(this.chainId)
    } catch (e) {
      throw new CosmosWalletException(new Error((e as any).message), {
        contextModule: 'Leap',
      })
    }
  }

  async getOfflineSigner(): Promise<OfflineDirectSigner> {
    const { chainId } = this
    const leap = await this.getLeapWallet()

    try {
      return leap.getOfflineSigner(chainId) as unknown as OfflineDirectSigner
    } catch (e) {
      throw new CosmosWalletException(new Error((e as any).message), {
        contextModule: 'Leap',
      })
    }
  }

  /**
   * This method is used to broadcast a transaction to the network.
   * Since it uses the `Sync` mode, it will not wait for the transaction to be included in a block,
   * so we have to make sure the transaction is included in a block after its broadcasted
   *
   * @param txRaw - raw transaction to broadcast
   * @returns tx hash
   */
  async broadcastTx(txRaw: TxRaw): Promise<string> {
    const { chainId } = this
    const leap = await this.getLeapWallet()
    const result = await leap.sendTx(
      chainId,
      txRaw.serializeBinary(),
      BroadcastMode.Sync,
    )

    if (!result || result.length === 0) {
      throw new TransactionException(
        new Error('Transaction failed to be broadcasted'),
        { contextModule: 'Leap' },
      )
    }

    return Buffer.from(result).toString('hex')
  }

  /**
   * This method is used to broadcast a transaction to the network.
   * Since it uses the `Block` mode, and it will wait for the transaction to be included in a block,
   *
   * @param txRaw - raw transaction to broadcast
   * @returns tx hash
   */
  async broadcastTxBlock(txRaw: TxRaw): Promise<string> {
    const { chainId } = this
    const leap = await this.getLeapWallet()
    const result = await leap.sendTx(
      chainId,
      txRaw.serializeBinary(),
      BroadcastMode.Block,
    )

    if (!result || result.length === 0) {
      throw new TransactionException(
        new Error('Transaction failed to be broadcasted'),
        { contextModule: 'Leap' },
      )
    }

    return Buffer.from(result).toString('hex')
  }

  async waitTxBroadcasted(txHash: string): Promise<string> {
    const endpoints = await this.getChainEndpoints()
    const txClient = new TxRestClient(endpoints.rest)
    const result = await txClient.waitTxBroadcast(txHash)

    return result.txhash
  }

  async getChainEndpoints(): Promise<{ rpc: string; rest: string }> {
    const { chainId } = this

    try {
      return getEndpointsFromChainId(chainId)
    } catch (e) {
      throw new CosmosWalletException(new Error((e as any).message), {
        contextModule: 'Leap',
      })
    }
  }

  public checkChainIdSupport = async () => {
    const { chainId } = this
    const leap = this.getLeap()

    try {
      await leap.getKey(chainId)

      // Chain exists already on Leap
      return true
    } catch (e) {
      return false
    }
  }

  private getLeap() {
    if (!$window) {
      throw new CosmosWalletException(
        new Error('Please install Leap extension'),
        {
          code: UnspecifiedErrorCode,
          type: ErrorType.WalletNotInstalledError,
          contextModule: 'Leap',
        },
      )
    }

    if (!$window.keplr) {
      throw new CosmosWalletException(
        new Error('Please install Leap extension'),
        {
          code: UnspecifiedErrorCode,
          type: ErrorType.WalletNotInstalledError,
          contextModule: 'Leap',
        },
      )
    }

    return $window.leap!
  }
}
