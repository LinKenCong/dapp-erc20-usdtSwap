import style from "./style.module.scss";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { Input, Divider, Button, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ABI, TOKEN_INFO_MAP } from "../../constants";
import { ContractInfo, ContractList } from "../../constants/type";
import { useEffect, useState } from "react";
import { fromEth, toEth, formatToNumber, countPrice } from "../../utils";
import { BigNumber, ethers } from "ethers";
import NetwrokLoading from "../NetwrokLoading";
import { useLocalization } from "../../localization";

const TokenSymbol = TOKEN_INFO_MAP.ZRO.symbol;

// antd
const { Search } = Input;
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// notification
const placement = "top";

const SwapInput = (props: { contractInfo: ContractInfo; contractList: ContractList }) => {
  const { t } = useLocalization();

  const { contractInfo, contractList } = props;
  const [amount, setAmount] = useState(BigNumber.from(0));
  // max
  const onMax = (value: string) => {
    const usdtIn = countPrice(contractInfo.purchasable, contractInfo.walletPrice);
    const decimals = BigNumber.from(10).pow(18);
    const balanceBuyCount = Number(
      fromEth(contractInfo.usdtBalance.div(contractInfo.walletPrice).mul(decimals))
    ).toFixed(2);
    const maxAmount = contractInfo.usdtBalance.gte(usdtIn) ? contractInfo.purchasable : toEth(balanceBuyCount);
    setAmount(maxAmount);
  };
  // btn
  const [btnActive, setBtnActive] = useState(true);
  const [api, contextHolder] = notification.useNotification();

  const verified = (): boolean => {
    const usdtIn = countPrice(amount, contractInfo.walletPrice);
    return !amount.eq(0) && contractInfo.allowance.gte(usdtIn) && contractInfo.usdtBalance.gte(usdtIn);
  };

  // approveUSDTHandle
  const approveConfig = usePrepareContractWrite({
    address: contractList.usdt,
    abi: ABI.ERC20,
    functionName: "approve",
    args: [contractList.swaptoken, countPrice(amount, contractInfo.walletPrice)],
    enabled: !amount.eq(0),
  });
  const approveContract = useContractWrite(approveConfig.config);
  const approveUSDTHandle = async () => {
    setBtnActive(false);
    try {
      api.open({
        message: `${t("msg_approve_usdt")}`,
        description: `${t("msg_description_approve_usdt")}`,
        placement,
      });
      const approveWrite = await approveContract?.writeAsync?.();
      await approveWrite?.wait().then((res: any) => {
        if (res.status == 1) {
          api.success({
            message: `${t("msg_approve_usdt_success")}`,
            description: `Hash: ${res?.transactionHash}`,
            placement,
            duration: null,
          });
        } else {
          api.error({
            message: `${t("msg_approve_usdt_error")}`,
            description: `Hash: ${res?.transactionHash}`,
            placement,
            duration: null,
          });
        }
        return res;
      });
    } catch (error) {
      console.error("approveUSDTHandle", error);
    }
    setBtnActive(true);
  };

  // swapTokenHandle
  const swapTokenConfig = usePrepareContractWrite({
    address: contractList.swaptoken,
    abi: ABI.SwapToken,
    functionName: "swap",
    args: [countPrice(amount, contractInfo.walletPrice)],
    enabled: verified(),
  });
  const swapTokenContract = useContractWrite(swapTokenConfig.config);
  const swapTokenHandle = async () => {
    if (amount.eq(0)) return;
    if (!verified()) {
      return api.error({
        message: `${t("msg_params_error")}`,
        description: `${t("msg_description_params_error")}`,
        placement,
        duration: null,
      });
    }
    setBtnActive(false);
    try {
      api.open({
        message: `${t("msg_swap_usdt")}`,
        description: `${t("msg_description_swap_usdt")}`,
        placement,
      });
      const swapTokenWrite = await swapTokenContract?.writeAsync?.();
      await swapTokenWrite?.wait().then((res: any) => {
        if (res.status == 1) {
          api.success({
            message: `${t("msg_swap_usdt_success")}`,
            description: `Hash: ${res?.transactionHash}`,
            placement,
            duration: null,
          });
        } else {
          api.error({
            message: `${t("msg_swap_usdt_error")}`,
            description: `Hash: ${res?.transactionHash}`,
            placement,
            duration: null,
          });
        }
        return res;
      });
    } catch (error) {
      console.error("swapTokenHandle", error);
    }
    setBtnActive(true);
    setAmount(BigNumber.from(0));
  };

  const checkBtn = () => {
    let isLock: Boolean = !btnActive;
    if (isLock) {
      return (
        <Button disabled size="large" className={style.item_btn} style={{ backgroundColor: "#fff" }}>
          {loadIcon}
        </Button>
      );
    } else if (contractInfo.purchasable.eq(0)) {
      return (
        <Button disabled size="large" className={style.item_btn} style={{ backgroundColor: "#fff" }}>
          {t("btn_sold_out")}
        </Button>
      );
    } else {
      const isApprove: Boolean = contractInfo.allowance.gte(countPrice(amount, contractInfo.walletPrice));
      if (isApprove) {
        return (
          <Button onClick={swapTokenHandle} disabled={!btnActive} size="large" className={style.item_btn_tx}>
            {t("btn_buy_now")}
          </Button>
        );
      } else {
        return (
          <Button
            onClick={approveUSDTHandle}
            disabled={!btnActive}
            size="large"
            className={style.item_btn}
            type="primary"
          >
            {t("btn_approve_usdt")}
          </Button>
        );
      }
    }
  };

  return (
    <>
      {contextHolder}
      {contractInfo ? (
        <div className={style.SwapInput}>
          <section className={style.SwapInput_section}>
            <h5>{t("title_purchase_quantity")}</h5>
            <Search
              size="large"
              className={style.item_input}
              enterButton={"Max"}
              placeholder="0.00"
              value={formatToNumber(amount)}
              type="Number"
              step="0.01"
              onChange={(e: any) => {
                const format = e.target.value.replace(/\-/g, "");
                const value = toEth(Number(format).toFixed(2));
                const amount = value.gt(contractInfo.purchasable) ? contractInfo.purchasable : value;
                setAmount(amount);
              }}
              onSearch={onMax}
            />
            {checkBtn()}
          </section>
          <section className={style.SwapInput_section}>
            <h5>{t("title_status_details")}</h5>
            <Divider style={{ margin: "0.5rem 0", backgroundColor: "#505050" }} />
            <table className={style.info_table}>
              <tbody className={style.info_tbody}>
                <tr>
                  <td>{t("label_current_price")}</td>
                  <td>{`1 ${TokenSymbol} = ${formatToNumber(contractInfo.walletPrice)} USDT`}</td>
                </tr>
                <tr>
                  <td>{t("label_current_swap_accounts")}</td>
                  <td>{contractInfo.totalSwapAccounts.toNumber()}</td>
                </tr>
                <tr>
                  <td>{t("label_current_swap_quantity")}</td>
                  <td>
                    {formatToNumber(contractInfo.totalSwapOf).toFixed(2)} {TokenSymbol}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      ) : (
        <NetwrokLoading />
      )}
    </>
  );
};

export default SwapInput;
