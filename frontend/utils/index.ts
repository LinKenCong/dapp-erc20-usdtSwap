import { utils, BigNumberish, BigNumber } from "ethers";
export const fromEth = (value: BigNumberish) => {
  return utils.formatUnits(value, 18);
};
export const toEth = (value: BigNumberish) => {
  return utils.parseUnits(String(value), 18);
};
export const formatToNumber = (value: BigNumber) => {
  return Number(fromEth(String(value)));
};
export const countPrice = (value: BigNumber, price: BigNumber) => {
  const decimals = BigNumber.from(10).pow(18);
  return value.mul(price).div(decimals);
};
export const countPercent = (
  buy: number | string,
  max: number | string
): number => {
  buy = Number(buy);
  max = Number(max);
  const sell = max - buy;
  const str = (Math.round((sell / max) * 10000) / 100).toString();
  const index = str.indexOf(".");
  const res = Number(str.substring(0, index == -1 ? str.length : index));
  return res;
};
