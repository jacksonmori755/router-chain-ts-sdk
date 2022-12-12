import TransportWebHID from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
// @ts-ignore
import TransportU2F from '@ledgerhq/hw-transport-u2f'
import EthereumApp from '@ledgerhq/hw-app-eth'
import type Transport from '@ledgerhq/hw-transport'
import { LedgerException } from '../../../../../../exceptions'
import AccountManager from './AccountManager'

export default class LedgerTransport {
  private ledger: EthereumApp | null = null

  private accountManager: AccountManager | null = null

  protected static async getTransport(): Promise<Transport> {
    try {
      if (await TransportWebHID.isSupported()) {
        const list = await TransportWebHID.list()

        if (list.length > 0 && list[0].opened) {
          return new TransportWebHID(list[0])
        }

        const existing = await TransportWebHID.openConnected().catch(() => null)

        if (existing) {
          return existing
        }

        return await TransportWebHID.request()
      }

      if (await TransportWebUSB.isSupported()) {
        const existing = await TransportWebUSB.openConnected().catch(() => null)

        if (existing) {
          return existing
        }

        return await TransportWebUSB.request()
      }
    } catch (e) {
      throw new LedgerException(new Error((e as any).message))
    }

    return TransportU2F.create()
  }

  async getInstance(): Promise<EthereumApp> {
    if (!this.ledger) {
      const transport = await LedgerTransport.getTransport()
      this.ledger = new EthereumApp(transport)

      transport.on('disconnect', () => {
        this.ledger = null
        this.accountManager = null
      })
    }

    return this.ledger
  }

  async getAccountManager(): Promise<AccountManager> {
    if (!this.accountManager) {
      this.accountManager = new AccountManager(await this.getInstance())
    }

    return this.accountManager
  }
}
