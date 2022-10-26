import { ChainErrorModule } from '../../../exceptions';

export * from './auth-rest';
export * from './bank';
export * from './gov';
export * from './mint';
export * from './staking';

export const ChainModule = { ...ChainErrorModule };
