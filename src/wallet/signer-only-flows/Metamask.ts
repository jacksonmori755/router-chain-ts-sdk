import { BaseAccount } from '../../classes';
import { ChainRestAuthApi } from '../../client';
import {
  Eip712ConvertFeeArgs,
  Eip712ConvertTxArgs,
  MsgExecuteCwContract,
  Msgs,
} from '../../core';
import { TransactionException } from '../../exceptions';
import {
  getChainInfoForNetwork,
  getEthereumChainIdForNetwork,
  getNetworkType,
} from '../../networks';
import { EthereumChainId } from '../../ts-types';
import {
  broadcastRawTx,
  createTxRawForBroadcast,
  getEtherMintTxPayload,
  getRouterSignerAddress,
  simulateRawTx,
} from '../../tx-ts';
import { TxContext } from '../../tx-ts/ethermint/types';
import {
  BigNumberInBase,
  hexToBase64,
  hexToBuff,
  ROUTER_DENOM,
  recoverTypedSignaturePubKey,
} from '../../utils';
import { GAS_LIMIT_MULTIPLIER, ROUTER_DEFAULT_GAS_PRICE } from '../utils';

/**
 * Executes query on cosmwasm contract on router chain via metamask
 * @param networkEnv - Network Environment of Router Chain
 * @param contractAddress - CosmWasm contract address
 * @param executeMsg - Execution Query
 * @param nodeUrl - LCD node Url
 * @param ethereumAddress - Ethereum address of user
 * @param metmaskSigner - window.ethereum
 * @param funds - if contract requires funds with execution
 * @param memo - String
 * @return {BroadcastResponse}
 * @throws {Error}
 */

export const executeQueryMetamask = async ({
  networkEnv,
  contractAddress,
  executeMsg,
  nodeUrl,
  ethereumAddress,
  metmaskSigner,
  funds,
  memo,
}: {
  networkEnv: string;
  contractAddress: string;
  executeMsg: Record<string, unknown>;
  nodeUrl: string;
  ethereumAddress: string;
  metmaskSigner: any;
  funds?: {
    denom: string;
    amount: string;
  };
  memo?: string;
}) => {
  try {
    // Account Info
    const userAccountInfo = await new ChainRestAuthApi(nodeUrl).fetchAccount(
      getRouterSignerAddress(ethereumAddress)
    );
    const baseAccount = BaseAccount.fromRestApi(userAccountInfo);
    const accountDetails = baseAccount.toAccountDetails();
    const context: TxContext = {
      chain: {
        chainId: getEthereumChainIdForNetwork(getNetworkType(networkEnv)),
        cosmosChainId: getChainInfoForNetwork(getNetworkType(networkEnv))
          .chainId,
      },
      sender: {
        accountAddress: getRouterSignerAddress(ethereumAddress),
        sequence: accountDetails.sequence,
        accountNumber: accountDetails.accountNumber,
        pubkey: accountDetails.pubKey?.key ?? '',
      },
      memo: memo ?? '',
    };

    // Execution Msg
    const executeContractMsg = MsgExecuteCwContract.fromJSON({
      sender: getRouterSignerAddress(ethereumAddress),
      contractAddress: contractAddress,
      msg: <Object>executeMsg,
      funds,
    });

    //EIP DATA
    const eipData: {
      msgs: Msgs | Msgs[];
      tx: Eip712ConvertTxArgs;
      fee?: Eip712ConvertFeeArgs;
      ethereumChainId: EthereumChainId;
    } = {
      msgs: [executeContractMsg],
      tx: {
        accountNumber: accountDetails.accountNumber.toString(),
        sequence: accountDetails.sequence.toString(),
        chainId: getChainInfoForNetwork(getNetworkType(networkEnv)).chainId,
      },
      ethereumChainId: getEthereumChainIdForNetwork(getNetworkType(networkEnv)),
      fee: {
        feePayer: getRouterSignerAddress(ethereumAddress),
      },
    };
    // Simulationx
    const simulatedTxPayload = getEtherMintTxPayload(context, eipData);
    const simulatedTx = createTxRawForBroadcast(
      simulatedTxPayload.signDirect.body.toBinary(),
      simulatedTxPayload.signDirect.authInfo.toBinary(),
      [new Uint8Array(2)]
    );
    const simulationResponse = await simulateRawTx(simulatedTx, nodeUrl);
    const simulatedFee = {
      amount: [
        {
          amount: new BigNumberInBase(ROUTER_DEFAULT_GAS_PRICE)
            .times(
              parseInt(
                (
                  parseInt(simulationResponse.gas_info.gas_used) *
                  GAS_LIMIT_MULTIPLIER
                ).toString()
              )
            )
            .toString(),
          denom: ROUTER_DENOM,
        },
      ],
      gas: parseInt(
        (
          parseInt(simulationResponse.gas_info.gas_used) * GAS_LIMIT_MULTIPLIER
        ).toString()
      ).toString(),
      feePayer:
        eipData.fee?.feePayer ?? getRouterSignerAddress(ethereumAddress),
    };

    //Replacing old fee with simulated fee
    eipData.fee = simulatedFee;
    const txPayload = getEtherMintTxPayload(context, eipData);

    //Taking signature from user
    const signature = await metmaskSigner.request({
      method: 'eth_signTypedData_v4',
      params: [ethereumAddress, JSON.stringify(txPayload.eipToSign)],
    });

    // Deriving signature from public key
    const signatureBytes = hexToBuff(signature);
    const publicKeyHex = recoverTypedSignaturePubKey(
      txPayload.eipToSign,
      signature
    );
    const publicKey = hexToBase64(publicKeyHex);

    // Placing Public Key in context
    context.sender.pubkey = publicKey;

    // Making new transaction payload with public key
    const txPayloadWithPubKey = getEtherMintTxPayload(context, eipData);
    const { signDirect } = txPayloadWithPubKey;
    const bodyBytes = signDirect.body.toBinary();
    const authInfoBytes = signDirect.authInfo.toBinary();
    const txRawToSend = createTxRawForBroadcast(bodyBytes, authInfoBytes, [
      signatureBytes,
    ]);

    // Broadcasting the transaction
    const broadcastResponse = await broadcastRawTx(txRawToSend, nodeUrl);
    return broadcastResponse;
  } catch (e) {
    throw new TransactionException(new Error((e as any).message));
  }
};
