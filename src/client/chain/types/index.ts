import { ChainErrorModule } from '../../../exceptions';

export * from './custom/auth-rest';
export * from './custom/bank';
export * from './custom/gov';
export * from './custom/mint';
export * from './custom/staking';
export * from './attestation';
export * from './crosschain';

export const ChainModule = { ...ChainErrorModule };
