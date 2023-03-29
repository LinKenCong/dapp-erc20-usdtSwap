import { Descriptions } from "antd";
import style from "./style.module.scss";
import { CURRENT_CONTRACT, TOKEN_INFO_MAP } from "../../constants";
import { ContractInfo } from "../../constants/type";

const SwapToken = {
  address: CURRENT_CONTRACT.swaptoken,
  ...TOKEN_INFO_MAP.swapToken,
};

const ItemStyle_Address = { color: "#F7D358" };

const TokenInfoList = (props: { contractInfo: ContractInfo }) => {
  const { contractInfo } = props;

  return (
    <>
      <div className={style.TokenInfoList}>
        <Descriptions
          column={1}
          bordered={true}
          labelStyle={{
            color: "#3b3b3b",
            fontWeight: "800",
            fontSize: "0.8rem",
            lineHeight: "1rem",
          }}
          contentStyle={{ textAlign: "right" }}
        >
          <Descriptions.Item label="预售地址" contentStyle={ItemStyle_Address}>
            {contractInfo.walletAccount}
          </Descriptions.Item>
          <Descriptions.Item label="代币名称">
            {SwapToken.name}
          </Descriptions.Item>
          <Descriptions.Item label="代币简称">
            {SwapToken.symbol}
          </Descriptions.Item>
          <Descriptions.Item label="标记小数">
            {SwapToken.decimals}
          </Descriptions.Item>
          <Descriptions.Item label="代币地址" contentStyle={ItemStyle_Address}>
            {SwapToken.address}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default TokenInfoList;
