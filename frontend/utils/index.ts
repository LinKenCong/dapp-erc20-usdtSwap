import { utils, BigNumberish } from "ethers";
export const fromEth = (value: BigNumberish) => {
  return utils.formatUnits(value, 18);
};
export const toEth = (value: BigNumberish) => {
  return utils.parseUnits(String(value), 18);
};
