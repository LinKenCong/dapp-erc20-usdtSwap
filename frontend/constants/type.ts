import { BigNumber } from "ethers";
export interface ContractInfo {
  walletIndex: number;
  walletAccount: string;
  purchasable: BigNumber;
  walletPrice: BigNumber;
  walletMaxSwap: BigNumber;
  walletSwapOf: BigNumber;
  totalSwapOf: BigNumber;
  totalSwapAccounts: BigNumber;
  allowance: BigNumber;
  usdtBalance: BigNumber;
}
export interface ContractList {
  swaptoken: `0x${string}`;
  usdt: `0x${string}`;
  zro: `0x${string}`;
}
