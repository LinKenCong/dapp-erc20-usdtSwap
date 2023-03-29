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
  [SupportedChainId.BSC]: "0x43b27367EB8c5A2c25134cB2E40Cee765C2Edb39",
  [SupportedChainId.BSC_TESTNET]: "0xC818CE8580cC0fd0D4065dE6259BfFf1bFA7e071",
};

export const CONTRACT_USDT_MAP = {
  [SupportedChainId.BSC]: "0x55d398326f99059fF775485246999027B3197955",
  [SupportedChainId.BSC_TESTNET]: "0x70AF9f834E448C1a115Ea98cc151A315e6538248",
};

export const TOKEN_INFO_MAP = {
  swapToken: {
    name: "ZRO Token",
    symbol: "ZRO",
    decimals: "18",
  },
  usdt: {
    name: "Binance-Peg BSC-USD",
    symbol: "BSC-USD",
    decimals: "18",
  },
};

export const SOCIAL_URL_LIST = {
  twitter: "https://www.google.com/",
  discord: "https://www.google.com/",
  youtube: "https://www.google.com/",
  telegram: "https://www.google.com/",
};

export const CURRENT_CHAINID = 97;

export const CURRENT_CONTRACT = {
  swaptoken: CONTRACT_SWAPTOKEN_MAP[CURRENT_CHAINID],
  usdt: CONTRACT_USDT_MAP[CURRENT_CHAINID],
};

export const CURRENT_CONTRACT_SWAPTOKEN = "0x8d2eA84191b5484fF4d550ECCF5a5E3E3351cc6C";
export const CURRENT_CONTRACT_USDT = "0x70AF9f834E448C1a115Ea98cc151A315e6538248";
