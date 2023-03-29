import { BigNumber } from "ethers";
export interface ContractInfo {
  walletIndex: number;
  walletAccount: string;
  purchasable: BigNumber;
  walletPrice: BigNumber;
  walletMaxSwap: BigNumber;
  walletSwapOf: BigNumber;
  allowance: BigNumber;
};
