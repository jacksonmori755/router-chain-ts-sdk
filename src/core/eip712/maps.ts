import snakecaseKeys from 'snakecase-keys';
import { GeneralException } from '../../exceptions';
import { numberToCosmosSdkDecString, snakeToPascal } from '../../utils';
import { TypedDataField } from './types';

/**
 * Function used to generate EIP712 types based on a message object
 * and its structure (recursive)
 */
export const objectKeysToEip712Types = (
  object: Record<string, any>,
  primaryType = 'MsgValue'
) => {
  const output = new Map<string, TypedDataField[]>();
  const types = new Array<TypedDataField>();

  for (const property in snakecaseKeys(object)) {
    if (property === '@type' || property === 'type') {
      continue;
    }

    console.log('object => ', object, 'property => ', property);

    const val = snakecaseKeys(object)[property];
    const type = typeof val;

    console.log('VAL =>', val);
    console.log('type =>', type);

    if (type === 'boolean') {
      types.push({ name: property, type: 'bool' });
    } else if (type === 'number' || type === 'bigint') {
      types.push({
        name: property,
        type: numberTypeToReflectionNumberType(property),
      });
    } else if (type === 'string') {
      types.push({ name: property, type: 'string' });
    } else if (type === 'object') {
      if (Array.isArray(val) && val.length === 0) {
        throw new GeneralException(new Error('Array with length 0 found'));
      } else if (Array.isArray(val) && val.length > 0) {
        const arrayFirstType = typeof val[0];
        const isPrimitive =
          arrayFirstType === 'boolean' ||
          arrayFirstType === 'number' ||
          arrayFirstType === 'string';

        if (isPrimitive) {
          for (const arrayEntry in val) {
            if (typeof arrayEntry !== arrayFirstType) {
              throw new GeneralException(
                new Error('Array with different types found')
              );
            }
          }

          if (arrayFirstType === 'boolean') {
            types.push({ name: property, type: 'bool[]' });
          } else if (arrayFirstType === 'number') {
            types.push({ name: property, type: 'number[]' });
          } else if (arrayFirstType === 'string') {
            types.push({ name: property, type: 'string[]' });
          }
        } else if (arrayFirstType === 'object') {
          const propertyType = appendTypePrefixToPropertyType(
            snakeToPascal(property),
            primaryType
          );
          const recursiveOutput = objectKeysToEip712Types(val[0], propertyType);
          const recursiveTypes = recursiveOutput.get(propertyType);

          types.push({
            name: property,
            type: `${propertyType}[]`,
          });
          output.set(propertyType, recursiveTypes!);
          //@ts-ignore
          for (const key of recursiveOutput.keys()) {
            if (key !== primaryType) {
              output.set(key, recursiveOutput.get(key)!);
            }
          }
        } else {
          throw new GeneralException(
            new Error('Array with elements of unknown type found')
          );
        }
      } else {
        const propertyType = appendTypePrefixToPropertyType(
          snakeToPascal(property),
          primaryType
        );
        const recursiveOutput = objectKeysToEip712Types(val, propertyType);
        const recursiveTypes = recursiveOutput.get(propertyType);

        types.push({ name: property, type: propertyType });
        output.set(propertyType, recursiveTypes!);
        //@ts-ignore
        for (const key of recursiveOutput.keys()) {
          if (key !== primaryType) {
            output.set(key, recursiveOutput.get(key)!);
          }
        }
      }
    } else {
      throw new GeneralException(new Error(`Type ${property} not found`));
    }
  }

  output.set(primaryType, types);

  return output;
};

/**
 * JavaScript doesn't know the exact number types that
 * we represent these fields on chain so we have to map
 * them in their chain representation from the number value
 * that is available in JavaScript
 */
export const numberTypeToReflectionNumberType = (property?: string) => {
  switch (property) {
    case 'order_mask':
      return 'int32';
    case 'order_type':
      return 'int32';
    case 'oracle_type':
      return 'int32';
    case 'round':
      return 'uint64';
    case 'oracle_scale_factor':
      return 'uint64';
    case 'expiry':
      return 'int64';
    case 'option':
      return 'int32';
    case 'proposal_id':
      return 'uint64';
    default:
      return 'uint64';
  }
};

/**
 * We need to represent some of the values in a proper format acceptable by the chain.
 *
 * 1. We need to represent some values from a number to string
 * This needs to be done for every number value except for maps (ex: vote option)
 *
 * 2. We need to convert every `sdk.Dec` value from a raw value to shifted by 1e18 value
 * ex: 0.01 -> 0.01000000000000000000, 1 -> 1.000000000000000000
 *
 * 3. For some fields, like 'amount' in the 'MsgIncreasePositionMargin' we have
 * to also specify the Message type to apply the sdk.Dec conversion because there
 * are other amount fields in other messages as well and we don't want to affect them
 */
export const mapValuesToProperValueType = <T extends Record<string, unknown>>(
  object: T,
  messageTypeUrl?: string
): T => {
  const numberToStringKeys = [
    'proposal_id',
    'round',
    'oracle_scale_factor',
    'timeout_timestamp',
    'revision_height',
    'revision_number',
    'expiry',
  ];
  const sdkDecKeys = [
    'min_price_tick_size',
    'price',
    'quantity',
    'margin',
    'trigger_price',
    'min_quantity_tick_size',
  ];
  const sdkDecKeyWithTypeMaps = {
    'exchange/MsgIncreasePositionMargin': ['amount'],
  };

  return Object.keys(object).reduce((result, key) => {
    const value = object[key];

    if (!value) {
      return result;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return {
          ...result,
          [key]: value.map(item =>
            mapValuesToProperValueType(item as Record<string, unknown>)
          ),
        };
      }

      return {
        ...result,
        [key]: mapValuesToProperValueType(value as Record<string, unknown>),
      };
    }

    if (typeof value === 'number') {
      if (numberToStringKeys.includes(key)) {
        return {
          ...result,
          [key]: value.toString(),
        };
      }

      // Maybe some other check needed
    }

    if (typeof value === 'string') {
      if (sdkDecKeys.includes(key)) {
        return {
          ...result,
          [key]: numberToCosmosSdkDecString(value),
        };
      }

      // Message Type Specific checks
      if (messageTypeUrl) {
        const typeInMap = Object.keys(sdkDecKeyWithTypeMaps).find(
          key => key === messageTypeUrl
        );

        if (typeInMap) {
          const sdkDecKeys =
            sdkDecKeyWithTypeMaps[
              typeInMap as keyof typeof sdkDecKeyWithTypeMaps
            ];

          if (sdkDecKeys.includes(key)) {
            return {
              ...result,
              [key]: numberToCosmosSdkDecString(value),
            };
          }
        }
      }
    }

    return {
      ...result,
      [key]: value,
    };
  }, {} as T);
};

/**
 * Append Type prefix to a Level0 EIP712 type
 * including its parent property type
 */
export const appendTypePrefixToPropertyType = (
  property: string,
  parentProperty: string = ''
) => {
  const propertyWithoutTypePrefix = property.replace('Type', '');
  const parentPropertyWithoutTypePrefix =
    parentProperty === 'MsgValue' ? '' : parentProperty.replace('Type', '');

  return `Type${parentPropertyWithoutTypePrefix + propertyWithoutTypePrefix}`;
};

/**
 * Mapping a path type to amino type for messages
 */
export const protoTypeToAminoType = (type: string): string => {
  const actualType = type.startsWith('/') ? type.substring(1) : type;

  switch (actualType) {
    // Auth
    case 'cosmos.auth.v1beta1.MsgUpdateParams':
      return 'cosmos-sdk/x/auth/MsgUpdateParams';

    // Authz
    case 'cosmos.authz.v1beta1.MsgGrant':
      return 'cosmos-sdk/MsgGrant';
    case 'cosmos.authz.v1beta1.MsgRevoke':
      return 'cosmos-sdk/MsgRevoke';
    case 'cosmos.authz.v1beta1.MsgExec':
      return 'cosmos-sdk/MsgExec';

    // Bank
    case 'cosmos.bank.v1beta1.MsgSend':
      return 'cosmos-sdk/MsgSend';
    case 'cosmos.bank.v1beta1.MsgMultiSend':
      return 'cosmos-sdk/MsgMultiSend';
    case 'cosmos.bank.v1beta1.MsgUpdateParams':
      return 'cosmos-sdk/x/bank/MsgUpdateParams';

    // Distribution
    case 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      return 'cosmos-sdk/MsgWithdrawDelegationReward';
    case 'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
      return 'cosmos-sdk/MsgWithdrawValCommission';
    case 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
      return 'cosmos-sdk/MsgModifyWithdrawAddress';
    case 'cosmos.distribution.v1beta1.MsgFundCommunityPool':
      return 'cosmos-sdk/MsgFundCommunityPool';
    case 'cosmos.distribution.v1beta1.MsgUpdateParams':
      return 'cosmos-sdk/distribution/MsgUpdateParams';

    // Gov
    case 'cosmos.gov.v1beta1.MsgSubmitProposal':
      return 'cosmos-sdk/MsgSubmitProposal';
    case 'cosmos.gov.v1beta1.MsgDeposit':
      return 'cosmos-sdk/MsgDeposit';
    case 'cosmos.gov.v1beta1.MsgVote':
      return 'cosmos-sdk/MsgVote';
    case 'cosmos.gov.v1beta1.MsgVoteWeighted':
      return 'cosmos-sdk/MsgVoteWeighted';

    // Staking
    case 'cosmos.staking.v1beta1.MsgCreateValidator':
      return 'cosmos-sdk/MsgCreateValidator';
    case 'cosmos.staking.v1beta1.MsgEditValidator':
      return 'cosmos-sdk/MsgEditValidator';
    case 'cosmos.staking.v1beta1.MsgDelegate':
      return 'cosmos-sdk/MsgDelegate';
    case 'cosmos.staking.v1beta1.MsgUndelegate':
      return 'cosmos-sdk/MsgUndelegate';
    case 'cosmos.staking.v1beta1.MsgBeginRedelegate':
      return 'cosmos-sdk/MsgBeginRedelegate';
    case 'cosmos.staking.v1beta1.MsgCancelUnbondingDelegation':
      return 'cosmos-sdk/MsgCancelUnbondingDelegation';
    case 'cosmos.staking.v1beta1.MsgUpdateParams':
      return 'cosmos-sdk/x/staking/MsgUpdateParams';

    // IBC
    case 'ibc.applications.transfer.v1.MsgTransfer':
      return 'cosmos-sdk/MsgTransfer';

    default:
      throw new GeneralException(new Error('Unknown message type: ' + type));
  }
};
