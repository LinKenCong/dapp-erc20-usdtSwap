import ABI_ERC20 from "./abi/ERC20.json";
import ABI_SwapToken from "./abi/SwapToken.json";

export const COUNTDOWN = {
  deadline: 1670190038000, // UTC
};

export const ABI = {
  ERC20: ABI_ERC20,
  SwapToken: ABI_SwapToken,
};

export enum SupportedChainId {
  BSC = 56,
  BSC_TESTNET = 97,
}

export const CONTRACT_SWAPTOKEN_MAP = {
  [SupportedChainId.BSC]: "0x43b27367EB8c5A2c25134cB2E40Cee765C2Edb39", //no
  [SupportedChainId.BSC_TESTNET]: "0xCaA05157d50d473FC0d48c5199Bd353Ee3b5F3Bf",
};

export const CONTRACT_USDT_MAP = {
  [SupportedChainId.BSC]: "0x55d398326f99059fF775485246999027B3197955", //no
  [SupportedChainId.BSC_TESTNET]: "0x70AF9f834E448C1a115Ea98cc151A315e6538248",
};

export const CONTRACT_ZRO_MAP = {
  [SupportedChainId.BSC]: "0xa9A444d6AC51078bfB60F5FF755F0A037916dAEA",
  [SupportedChainId.BSC_TESTNET]: "0xfD69a1aAE97A910f134Dc01BC53F8a02183fa321",
};

export const TOKEN_INFO_MAP = {
  ZRO: {
    name: "ZROs Token",
    symbol: "ZROs",
    decimals: "18",
  },
  usdt: {
    name: "Binance-Peg BSC-USD",
    symbol: "BSC-USD",
    decimals: "18",
  },
};

export const SOCIAL_URL_LIST = {
  twitter: "https://twitter.com/ZeroneOfficial_",
  discord: "https://discord.gg/b984JGErVN",
  youtube: "https://www.youtube.com/@ZeroneOfficial",
  telegram: "https://t.me/zeroneofficial_En",
  medium: "https://zeroneofficial.medium.com/",
};
