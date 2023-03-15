import ABI_ERC20 from "./abi/ERC20.json";

export const ABI = {
  ERC20: ABI_ERC20,
};

export enum SupportedChainId {
  BSC = 56,
  BSC_TESTNET = 97,
}

export const CONTRACT_SWAPTOKEN_MAP = {
  [SupportedChainId.BSC]: "",
  [SupportedChainId.BSC_TESTNET]: "",
};

export const CONTRACT_USDT_MAP = {
  [SupportedChainId.BSC]: "0x55d398326f99059fF775485246999027B3197955",
  [SupportedChainId.BSC_TESTNET]: "",
};

export const TOKEN_INFO_MAP = {
  swapToken: {
    name: "Token name",
    symbol: "Token symbol",
    decimals: "18",
  },
  usdt: {
    name: "Binance-Peg BSC-USD",
    symbol: "BSC-USD",
    decimals: "18",
  },
};
