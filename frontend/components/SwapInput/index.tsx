import style from "./style.module.scss";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { Input, Divider, Button, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ABI } from "../../constants";
import { ContractInfo, ContractList } from "../../constants/type";
import { useEffect, useState } from "react";
import { fromEth, toEth, formatToNumber, countPrice } from "../../utils";
import { BigNumber, ethers } from "ethers";
import NetwrokLoading from "../NetwrokLoading";

// antd
const { Search } = Input;
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// notification
const placement = "top";

const SwapInput = (props: {
  contractInfo: ContractInfo;
  contractList: ContractList;
}) => {
  const { contractInfo, contractList } = props;
  const [amount, setAmount] = useState(BigNumber.from(0));
  // max
  const onMax = (value: string) => {
    const usdtIn = countPrice(
      contractInfo.purchasable,
      contractInfo.walletPrice
    );
    const decimals = BigNumber.from(10).pow(18);
    const balanceBuyCount = Number(
      fromEth(
        contractInfo.usdtBalance.div(contractInfo.walletPrice).mul(decimals)
      )
    ).toFixed(2);
    const maxAmount = contractInfo.usdtBalance.gte(usdtIn)
      ? contractInfo.purchasable
      : toEth(balanceBuyCount);
    setAmount(maxAmount);
  };
  // btn
  const [btnActive, setBtnActive] = useState(true);
  const [api, contextHolder] = notification.useNotification();

  const verified = (): boolean => {
    const usdtIn = countPrice(amount, contractInfo.walletPrice);
    return (
      !amount.eq(0) &&
      contractInfo.allowance.gte(usdtIn) &&
      contractInfo.usdtBalance.gte(usdtIn)
    );
  };

  // approveUSDTHandle
  const approveConfig = usePrepareContractWrite({
    address: contractList.usdt,
    abi: ABI.ERC20,
    functionName: "approve",
    args: [
      contractList.swaptoken,
      countPrice(amount, contractInfo.walletPrice),
    ],
    enabled: !amount.eq(0),
  });
  const approveContract = useContractWrite(approveConfig.config);
  const approveUSDTHandle = async () => {
    setBtnActive(false);
    try {
      api.open({
        message: `Approve USDT`,
        description: `Authorizing USDT to the Swap contract...`,
        placement,
      });
      const approveWrite = await approveContract?.writeAsync?.();
      await approveWrite?.wait().then((res: any) => {
        if (res.status == 1) {
          api.success({
            message: `Approve USDT Success`,
            description: `Hash: ${res?.transactionHash}`,
            placement,
            duration: null,
          });
        } else {
          api.error({
            message: `Approve USDT Error`,
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
        message: `Params Error`,
        description: `Check You Token Balance.`,
        placement,
        duration: null,
      });
    }
    setBtnActive(false);
    try {
      api.open({
        message: `Swap USDT to ZRO`,
        description: `Swap Token...`,
        placement,
      });
      const swapTokenWrite = await swapTokenContract?.writeAsync?.();
      await swapTokenWrite?.wait().then((res: any) => {
        if (res.status == 1) {
          api.success({
            message: `Swap USDT to ZRO Success`,
            description: `Hash: ${res?.transactionHash}`,
            placement,
            duration: null,
          });
        } else {
          api.error({
            message: `Swap USDT to ZRO Error`,
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
        <Button
          disabled
          size="large"
          className={style.item_btn}
          style={{ backgroundColor: "#fff" }}
        >
          {loadIcon}
        </Button>
      );
    } else if (contractInfo.purchasable.eq(0)) {
      return (
        <Button
          disabled
          size="large"
          className={style.item_btn}
          style={{ backgroundColor: "#fff" }}
        >
          Sold out
        </Button>
      );
    } else {
      const isApprove: Boolean = contractInfo.allowance.gte(
        countPrice(amount, contractInfo.walletPrice)
      );
      if (isApprove) {
        return (
          <Button
            onClick={swapTokenHandle}
            disabled={!btnActive}
            size="large"
            className={style.item_btn_tx}
          >
            立即购买
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
            授权 USDT
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
            <h5>购买数量 {formatToNumber(amount)}</h5>
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
                const amount = value.gt(contractInfo.purchasable)
                  ? contractInfo.purchasable
                  : value;
                setAmount(amount);
              }}
              onSearch={onMax}
            />
            {checkBtn()}
          </section>
          <section className={style.SwapInput_section}>
            <h5>状态详情</h5>
            <Divider
              style={{ margin: "0.5rem 0", backgroundColor: "#505050" }}
            />
            <table className={style.info_table}>
              <tbody className={style.info_tbody}>
                <tr>
                  <td>当前价格</td>
                  <td>{`1 ZRO = ${formatToNumber(
                    contractInfo.walletPrice
                  )} USDT`}</td>
                </tr>
                <tr>
                  <td>贡献者总数</td>
                  <td>{contractInfo.totalSwapAccounts.toNumber()}</td>
                </tr>
                <tr>
                  <td>您购买的</td>
                  <td>
                    {formatToNumber(contractInfo.totalSwapOf).toFixed(2)} ZRO
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
