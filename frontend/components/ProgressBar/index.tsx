import type { NextComponentType } from "next";
import { Progress } from "antd";
import style from "./style.module.scss";
import { useState } from "react";
import { TOKEN_INFO_MAP } from "../../constants";

const ProgressBar: NextComponentType = () => {
  const TokenSymbol = TOKEN_INFO_MAP.swapToken.symbol;
  const [maxToken, setMaxToken] = useState("1000");
  const [sellToken, setSellToken] = useState("22.2");
  const [buyToken, setBuyToken] = useState("250.5");

  const countPercent = (buy: number | string, max: number | string): number => {
    buy = Number(buy);
    max = Number(max);
    const sell = max - buy;
    const str = (Math.round((sell / max) * 10000) / 100).toString();
    const index = str.indexOf(".");
    const res = Number(str.substring(0, index == -1 ? str.length : index));
    return res;
  };

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
            {maxToken}
            <span className={style.symbol}>{TokenSymbol}</span>
          </span>
          <span>
            {buyToken}
            <span className={style.symbol}>{TokenSymbol}</span>
          </span>
        </div>
      </aside>
    </>
  );
};

export default ProgressBar;
