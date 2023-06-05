import { getAddressFromRouterAddress, getRouterAddress, Msgs } from '../..';
import {
  BigNumberInBase,
  DEFAULT_EXCHANGE_LIMIT,
  DEFAULT_GAS_LIMIT,
} from '../..';

export const getGasPriceBasedOnMessage = (msgs: Msgs[]): number => {
  const hasMultipleMessages = Array.isArray(msgs);
  const isMsgExecMessage = (message: Msgs) =>
    message.toWeb3()['@type'].includes('MsgExec');

  const hasMsgExecMessages = Array.isArray(msgs)
    ? msgs.some(isMsgExecMessage)
    : isMsgExecMessage(msgs);

  if (hasMsgExecMessages) {
    return DEFAULT_GAS_LIMIT * 1.2;
  }

  const isExchangeMessage = (message: Msgs) =>
    message.toWeb3()['@type'].startsWith('/router');
  const hasExchangeMessages = Array.isArray(msgs)
    ? msgs.some(isExchangeMessage)
    : isExchangeMessage(msgs);

  if (hasExchangeMessages) {
    return new BigNumberInBase(DEFAULT_EXCHANGE_LIMIT)
      .times(hasMultipleMessages ? msgs.length : 1)
      .toNumber();
  }

  const isGovMessage = (message: Msgs) => {
    const type = message.toWeb3()['@type'];

    if (!type.includes('gov')) {
      return false;
    }

    return type.includes('MsgDeposit') || type.includes('MsgSubmitProposal');
  };
  const hasGovMessages = Array.isArray(msgs)
    ? msgs.some(isGovMessage)
    : isGovMessage(msgs);

  if (hasGovMessages) {
    return new BigNumberInBase(DEFAULT_GAS_LIMIT)
      .times(15)
      .times(hasMultipleMessages ? msgs.length : 1)
      .toNumber();
  }

  return new BigNumberInBase(DEFAULT_GAS_LIMIT)
    .times(hasMultipleMessages ? msgs.length : 1)
    .toNumber();
};

export const getRouterSignerAddress = (address: string | undefined) => {
  if (!address) {
    return '';
  }

  if (address.startsWith('router')) {
    return address;
  }

  if (address.startsWith('0x')) {
    return getRouterAddress(address);
  }

  return '';
};

export const getEthereumSignerAddress = (address: string | undefined) => {
  if (!address) {
    return '';
  }

  if (address.startsWith('0x')) {
    return address;
  }

  if (address.startsWith('router')) {
    return getAddressFromRouterAddress(address);
  }

  return '';
};
