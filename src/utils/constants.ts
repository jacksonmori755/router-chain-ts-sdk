import BigNumberInBase from './classes/BigNumber/BigNumberInBase';
import BigNumber from './classes/BigNumber/BigNumber';

export const ROUTER_DENOM = 'router';

export const BECH32_PUBKEY_ACC_PREFIX = 'routerpub';
export const BECH32_PUBKEY_VAL_PREFIX = 'routervaloperpub';
export const BECH32_PUBKEY_CONS_PREFIX = 'routervalconspub';

export const BECH32_ADDR_ACC_PREFIX = 'router';
export const BECH32_ADDR_VAL_PREFIX = 'routervaloper';
export const BECH32_ADDR_CONS_PREFIX = 'routervalcons';

export const DEFAULT_DERIVATION_PATH = "m/44'/60'/0'/0/0";

export const DEFAULT_BRIDGE_FEE_DENOM = 'router';
export const DEFAULT_BRIDGE_FEE_PRICE = '500000000';
export const DEFAULT_BRIDGE_FEE_AMOUNT = '200000000000000';
export const DEFAULT_TIMEOUT_HEIGHT = 40;

export const DEFAULT_FEE_DENOM = 'router';
export const DEFAULT_GAS_LIMIT = 400000;
export const DEFAULT_EXCHANGE_GAS_LIMIT = 200000;
export const DEFAULT_GAS_PRICE = 500000000;

export const DUST_AMOUNT = 0.0001;
export const PAGINATION_TOTAL_PAGE_LIMIT: number = 10000;
export const DEFAULT_PAGINATION_TOTAL_COUNT: number = 1000000;

export const DEFAULT_STD_FEE = {
  amount: [
    {
      amount: new BigNumberInBase(DEFAULT_GAS_LIMIT)
        .times(DEFAULT_GAS_PRICE)
        .toString(),
      denom: 'router',
    },
  ],
  gas: DEFAULT_GAS_LIMIT.toString(),
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const DEFAULT_EXCHANGE_LIMIT = 200000;
export const DEFAULT_TIMESTAMP_TIMEOUT_MS = 60 * 1000 * 3;

export const DEFAULT_STD_FEE_BY_DENOM = (denom: string = 'router') => ({
  amount: [
    {
      denom,
      amount: new BigNumber(DEFAULT_GAS_LIMIT)
        .times(DEFAULT_GAS_PRICE)
        .toString(),
    },
  ],
  gas: DEFAULT_GAS_LIMIT.toString(),
});
