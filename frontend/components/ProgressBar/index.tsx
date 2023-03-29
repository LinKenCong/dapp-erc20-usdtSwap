import { Progress } from "antd";
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { TOKEN_INFO_MAP } from "../../constants";
import { fromEth, countPercent } from "../../utils";
import { ContractInfo } from "../../constants/type";

const ProgressBar = (props: { contractInfo: ContractInfo }) => {
  const { contractInfo } = props;
  const TokenSymbol = TOKEN_INFO_MAP.swapToken.symbol;

  const [maxToken, setMaxToken] = useState("0");
  const [sellToken, setSellToken] = useState("0");
  const [buyToken, setBuyToken] = useState("0");
  useEffect(() => {
    if (contractInfo) {
      setMaxToken(fromEth(contractInfo.walletMaxSwap));
      setSellToken(fromEth(contractInfo.purchasable));
      setBuyToken(
        fromEth(contractInfo.walletMaxSwap.sub(contractInfo.purchasable))
      );
    }
  }, [contractInfo]);

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
