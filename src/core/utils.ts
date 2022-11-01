import { Eip712ConvertFeeArgs, getDefaultEip712Types } from './eip712';

export function prepareSignBytes(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(prepareSignBytes);
  }

  // string, number, or null
  if (typeof obj !== `object` || obj === null) {
    return obj;
  }

  const sorted: any = {};

  Object.keys(obj)
    .sort()
    .forEach(key => {
      if (obj[key] === undefined || obj[key] === null) return;
      sorted[key] = prepareSignBytes(obj[key]);
    });

  return sorted;
}

export const getTypesIncludingFeePayer = ({
  fee,
  types,
}: {
  fee?: Eip712ConvertFeeArgs;
  types: ReturnType<typeof getDefaultEip712Types>;
}) => {
  if (!fee) {
    return types;
  }

  if (!fee.feePayer) {
    return types;
  }

  types.types['Fee'].push({ name: 'feePayer', type: 'string' });

  return types;
};
