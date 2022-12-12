import { DEFAULT_TIMESTAMP_TIMEOUT_MS } from '../../..';
import { Wallet } from '../../types/enums';

/**
 * Returns a timeout timestamp in milliseconds so its compatible
 * with the way Cosmos handles transactions
 */
export const makeTimeoutTimestamp = (
  timeoutInMs: number = DEFAULT_TIMESTAMP_TIMEOUT_MS
) => {
  const now = new Date();
  const timestamp = new Date(now.getTime() + timeoutInMs);
  const actualTimestamp = timestamp.getTime();

  return actualTimestamp;
};

/**
 * Returns a timeout timestamp in nanoseconds so its compatible
 * with the way Cosmos handles transactions
 */
export const makeTimeoutTimestampInNs = (
  timeoutInMs: number = DEFAULT_TIMESTAMP_TIMEOUT_MS
) => makeTimeoutTimestamp(timeoutInMs) * 1e6;

export const isCosmosWallet = (wallet: Wallet): boolean =>
  [Wallet.Cosmostation, Wallet.Leap, Wallet.Keplr].includes(wallet);
