import { Descriptions } from "antd";
import style from "./style.module.scss";
import { TOKEN_INFO_MAP } from "../../constants";
import { ContractInfo, ContractList } from "../../constants/type";
import { useLocalization } from "../../localization";

const SwapToken = {
  ...TOKEN_INFO_MAP.ZRO,
};

const ItemStyle_Address = { color: "#F7D358", fontSize: "0.8rem" };

const TokenInfoList = (props: { contractInfo: ContractInfo; contractList: ContractList }) => {
  // translation
  const { t } = useLocalization();
  const { contractInfo, contractList } = props;

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
          <Descriptions.Item label={t("label_address_sell")} contentStyle={ItemStyle_Address}>
            {contractInfo.walletAccount}
          </Descriptions.Item>
          <Descriptions.Item label={t("label_token_name")}>{SwapToken.name}</Descriptions.Item>
          <Descriptions.Item label={t("label_token_symbol")}>{SwapToken.symbol}</Descriptions.Item>
          <Descriptions.Item label={t("label_token_decimals")}>{SwapToken.decimals}</Descriptions.Item>
          <Descriptions.Item label={t("label_address_token")} contentStyle={ItemStyle_Address}>
            {contractList.zro}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default TokenInfoList;
