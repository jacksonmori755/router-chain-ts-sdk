import { BigNumberInBase } from '../..';

export const GWEI_IN_WEI: BigNumberInBase = new BigNumberInBase(1000000000);
export const GAS_LIMIT_MULTIPLIER = 1.2;
export const GAS_PRICE_MULTIPLIER = 1.1;
export const TX_DEFAULTS_GAS = 80_000_000;
export const DEFAULT_GAS_PRICE = new BigNumberInBase(6).times(GWEI_IN_WEI);
export const ROUTER_DEFAULT_GAS_PRICE = '500000001';

