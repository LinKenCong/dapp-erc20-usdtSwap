import type { NextComponentType } from "next";
import { Progress } from "antd";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { TOKEN_INFO_MAP } from "../../constants";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { ABI, CURRENT_CONTRACT_SWAPTOKEN } from "../../constants";
import { fromEth } from "../../utils";
import { BigNumber } from "ethers";

const SwapTokenContractAddress = CURRENT_CONTRACT_SWAPTOKEN;

const ProgressBar: NextComponentType = () => {
  const TokenSymbol = TOKEN_INFO_MAP.swapToken.symbol;

  const countPercent = (buy: number | string, max: number | string): number => {
    buy = Number(buy);
    max = Number(max);
    const sell = max - buy;
    const str = (Math.round((sell / max) * 10000) / 100).toString();
    const index = str.indexOf(".");
    const res = Number(str.substring(0, index == -1 ? str.length : index));
    return res;
  };

  const { address, isConnecting, isDisconnected } = useAccount();
  const contract_walletIndex = useContractRead({
    address: SwapTokenContractAddress,
    abi: ABI.SwapToken,
    functionName: "walletIndex",
    watch: true,
  });
  const contract_reads = useContractReads({
    contracts: [
      {
        address: SwapTokenContractAddress,
        abi: ABI.SwapToken,
        functionName: "purchasableTokens",
        args: [contract_walletIndex.data],
      },
      {
        address: SwapTokenContractAddress,
        abi: ABI.SwapToken,
        functionName: "getWalletAccout",
        args: [contract_walletIndex.data],
      },
      {
        address: SwapTokenContractAddress,
        abi: ABI.SwapToken,
        functionName: "getWalletMaxSwap",
        args: [contract_walletIndex.data],
      },
      {
        address: SwapTokenContractAddress,
        abi: ABI.SwapToken,
        functionName: "getWalletSwapOf",
        args: [contract_walletIndex.data, address],
      },
    ],
    watch: true,
  });

  const [maxToken, setMaxToken] = useState("0");
  const [sellToken, setSellToken] = useState("0");
  const [buyToken, setBuyToken] = useState("0");
  useEffect(() => {
    if (contract_reads.data) {
      setMaxToken(fromEth(BigNumber.from(contract_reads.data[2] || 0)));
      setSellToken(fromEth(BigNumber.from(contract_reads.data[0] || 0)));
      setBuyToken(
        fromEth(
          BigNumber.from(contract_reads.data[2] || 0).sub(
            BigNumber.from(contract_reads.data[0] || 0)
          )
        )
      );
    }
  }, [contract_reads.data]);

  return (
    <>
      <aside className={style.ProgressBar}>
        <Progress
          percent={countPercent(buyToken, maxToken)}
          showInfo={false}
          strokeColor={"#FE9A2E"}
          trailColor={"#000"}
        />
        <div className={style.sellInfo}>
          <span>
            {Number(sellToken).toFixed(2)}
            <span className={style.symbol}>{TokenSymbol}</span>
          </span>
          <span>
            {Number(buyToken).toFixed(2)}
            <span className={style.symbol}>{TokenSymbol}</span>
          </span>
        </div>
      </aside>
    </>
  );
};

export default ProgressBar;
