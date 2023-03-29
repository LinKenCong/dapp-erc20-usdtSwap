import { BigNumber } from "ethers";
export interface ContractInfo {
  walletIndex: number;
  walletAccount: string;
  purchasable: BigNumber;
  walletPrice: BigNumber;
  walletMaxSwap: BigNumber;
  walletSwapOf: BigNumber;
  allowance: BigNumber;
}
export interface ContractList {
  swaptoken: `0x${string}`;
  usdt: `0x${string}`;
  zro: `0x${string}`;
}
