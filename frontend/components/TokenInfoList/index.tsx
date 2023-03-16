import style from "./style.module.scss";
import { CURRENT_CONTRACT, TOKEN_INFO_MAP } from "../../constants";

const SwapToken = {
  address: CURRENT_CONTRACT.swaptoken,
  ...TOKEN_INFO_MAP.swapToken,
};

const TokenInfoList = () => {
  return (
    <>
      <div className="TokenInfoList"></div>
    </>
  );
};

export default TokenInfoList;
