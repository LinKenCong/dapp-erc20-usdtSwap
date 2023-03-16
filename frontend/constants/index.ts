import ABI_ERC20 from "./abi/ERC20.json";

export const ABI = {
  ERC20: ABI_ERC20,
};

export enum SupportedChainId {
  BSC = 56,
  BSC_TESTNET = 97,
}

export const CONTRACT_SWAPTOKEN_MAP = {
  [SupportedChainId.BSC]: "0x000000000000000000000000000000000000main",
  [SupportedChainId.BSC_TESTNET]: "0x000000000000000000000000000000000000test",
};

export const CONTRACT_USDT_MAP = {
  [SupportedChainId.BSC]: "0x55d398326f99059fF775485246999027B3197955",
  [SupportedChainId.BSC_TESTNET]: "0x000000000000000000000000000000000000test",
};

export const TOKEN_INFO_MAP = {
  swapToken: {
    name: "Token name",
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

export const CURRENT_CONTRACT = {
  swaptoken:
    process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? CONTRACT_SWAPTOKEN_MAP[97]
      : CONTRACT_SWAPTOKEN_MAP[56],
};
