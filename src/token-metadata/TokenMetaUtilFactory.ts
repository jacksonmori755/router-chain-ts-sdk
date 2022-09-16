import { Network } from '../networks';
import { TokenMetaUtil } from './TokenMetaUtil';
import {
  tokensBySymbol,
  tokensBySymbolForDevnet,
  tokensBySymbolForTestnet,
} from './tokens';

export class TokenMetaUtilFactory {
  static make(network: Network = Network.Mainnet): TokenMetaUtil {
    switch (network) {
      case Network.Mainnet:
        return new TokenMetaUtil(tokensBySymbol);
      case Network.Devnet:
        return new TokenMetaUtil(tokensBySymbolForDevnet);
      case Network.Local:
        return new TokenMetaUtil(tokensBySymbol);
      case Network.Testnet:
        return new TokenMetaUtil(tokensBySymbolForTestnet);
      default:
        return new TokenMetaUtil(tokensBySymbol);
    }
  }
}
