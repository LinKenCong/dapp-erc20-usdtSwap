import { NextComponentType } from "next";
import style from "./style.module.scss";
import {
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { Input, Divider, Button, notification, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  ABI,
  CURRENT_CONTRACT_SWAPTOKEN,
  CURRENT_CONTRACT_USDT,
} from "../../constants";
import { useEffect, useState } from "react";
import { fromEth, toEth } from "../../utils";
import { BigNumber } from "ethers";
import NetwrokLoading from "../NetwrokLoading";

// antd
const { Search } = Input;
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// notification
const placement = "top";

const SwapTokenContractAddress = CURRENT_CONTRACT_SWAPTOKEN;
const USDTContractAddress = CURRENT_CONTRACT_USDT;

const SwapInput: NextComponentType = () => {
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
        functionName: "getWalletPrice",
        args: [contract_walletIndex.data],
      },
      {
        address: SwapTokenContractAddress,
        abi: ABI.SwapToken,
        functionName: "getWalletSwapOf",
        args: [contract_walletIndex.data, address],
      },
      {
        address: USDTContractAddress,
        abi: ABI.ERC20,
        functionName: "allowance",
        args: [address, SwapTokenContractAddress],
      },
    ],
  });

  const basicBN = BigNumber.from(0);
  const [amount, setAmount] = useState(basicBN);
  const [sellToken, setSellToken] = useState(basicBN);
  const [walletPrice, setWalletPrice] = useState(basicBN);
  const [walletSwapOf, setWalletSwapOf] = useState(basicBN);
  const [usdtAllowance, setUsdtAllowance] = useState(basicBN);
  useEffect(() => {
    if (contract_reads.data) {
      setSellToken(BigNumber.from(contract_reads.data[0] || 0));
      setWalletPrice(BigNumber.from(contract_reads.data[1] || 0));
      setWalletSwapOf(BigNumber.from(contract_reads.data[2] || 0));
      setUsdtAllowance(BigNumber.from(contract_reads.data[3] || 0));
    }
  }, [contract_reads.data]);

  // eth math count
  const formatToNumber = (value: BigNumber) => {
    return Number(fromEth(String(value)));
  };
  const countPrice = (value: BigNumber) => {
    const decimals = BigNumber.from(10).pow(18);
    return value.mul(walletPrice).div(decimals);
  };

  // max
  const onMax = (value: string) => {
    setAmount(sellToken);
  };

  // btn
  const [btnActive, setBtnActive] = useState(true);
  const [api, contextHolder] = notification.useNotification();

  // approveUSDTHandle
  const approveConfig = usePrepareContractWrite({
    address: USDTContractAddress,
    abi: ABI.ERC20,
    functionName: "approve",
    args: [SwapTokenContractAddress, countPrice(amount)],
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
    await contract_reads.refetch();
    setBtnActive(true);
  };

  // swapTokenHandle
  const swapTokenConfig = usePrepareContractWrite({
    address: SwapTokenContractAddress,
    abi: ABI.SwapToken,
    functionName: "swap",
    args: [countPrice(amount)],
    enabled: !amount.eq(0) && usdtAllowance.gte(countPrice(amount)),
  });
  const swapTokenContract = useContractWrite(swapTokenConfig.config);
  const swapTokenHandle = async () => {
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
    await contract_reads.refetch();
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
    } else {
      const isApprove: Boolean = usdtAllowance.gte(countPrice(amount));
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
      {contract_reads.isSuccess ? (
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
                const amount = value.gt(sellToken) ? sellToken : value;
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
                  <td>Current Rat</td>
                  <td>{`1 ZRO = ${formatToNumber(walletPrice)} USDT`}</td>
                </tr>
                <tr>
                  <td>贡献者总数</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>您购买的</td>
                  <td>{formatToNumber(walletSwapOf).toFixed(2)} ZRO</td>
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
