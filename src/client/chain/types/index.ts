import { ChainErrorModule } from '../../../exceptions';

export * from './custom/auth-rest';
export * from './custom/bank';
export * from './custom/gov';
export * from './custom/mint';
export * from './custom/staking';
export * from './crosstalk';
export * from './inbound';
export * from './outbound';
export * from './attestation';

export const ChainModule = { ...ChainErrorModule };
