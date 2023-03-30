import type { NextPage } from "next";
import Head from "next/head";

import HeaderNav from "../components/HeaderNav";
import ArticleSection from "../components/ArticleSection";
import TokenInfoList from "../components/TokenInfoList";
import SocialUrlList from "../components/SocialUrlList";
import SwapInput from "../components/SwapInput";
import Countdown from "../components/Countdown";
import ProgressBar from "../components/ProgressBar";
import NoticeBoard from "../components/NoticeBoard";

import style from "../styles/Home.module.scss";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import logo from "../assets/logo/logo2.png";
import active_logo from "../assets/logo/logo3.png";
import icon_bnb from "../assets/icon/BNB.svg";
import Image from "next/image";
import { COUNTDOWN } from "../constants";

import { useAccount, useContractRead, useContractReads, useChainId } from "wagmi";
import { ABI, CONTRACT_SWAPTOKEN_MAP, CONTRACT_USDT_MAP, CONTRACT_ZRO_MAP, SupportedChainId } from "../constants";
import { ContractInfo, ContractList } from "../constants/type";
import { BigNumber, ethers } from "ethers";

const Home: NextPage = () => {
  // page load
  const [domLoaded, setDomLoaded] = useState(false);
  // countdown
  const [onFinish, setOnFinish] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    if (Date.now() >= COUNTDOWN.deadline) {
      setOnFinish(true);
    }
  }, []);

  // chain
  const reqChainId = useChainId();
  const chainId: SupportedChainId = reqChainId;
  const { address, isConnecting, isDisconnected } = useAccount();
  const baseContractList: ContractList = {
    swaptoken: ethers.utils.getAddress(CONTRACT_SWAPTOKEN_MAP[chainId]),
    usdt: ethers.utils.getAddress(CONTRACT_USDT_MAP[chainId]),
    zro: ethers.utils.getAddress(CONTRACT_ZRO_MAP[chainId]),
  };
  const [contractList, setContractList] = useState(baseContractList);

  // reads contract
  const [walletIndex, setWalletIndex] = useState(0);
  const contract_walletIndex = useContractRead({
    address: contractList.swaptoken,
    abi: ABI.SwapToken,
    functionName: "walletIndex",
    watch: true,
  });
  useEffect(() => {
    // reads contract
    if (typeof contract_walletIndex.data == "number") {
      setWalletIndex(contract_walletIndex.data);
    }
  }, [contract_walletIndex.data]);

  const contract_reads = useContractReads({
    contracts: [
      {
        address: contractList.swaptoken,
        abi: ABI.SwapToken,
        functionName: "getWalletAccout",
        args: [contract_walletIndex.data],
      },
      {
        address: contractList.swaptoken,
        abi: ABI.SwapToken,
        functionName: "purchasableTokens",
        args: [walletIndex],
      },
      {
        address: contractList.swaptoken,
        abi: ABI.SwapToken,
        functionName: "getWalletPrice",
        args: [walletIndex],
      },
      {
        address: contractList.swaptoken,
        abi: ABI.SwapToken,
        functionName: "getWalletMaxSwap",
        args: [contract_walletIndex.data],
      },
      {
        address: contractList.swaptoken,
        abi: ABI.SwapToken,
        functionName: "getWalletSwapOf",
        args: [walletIndex, address],
      },
      {
        address: contractList.usdt,
        abi: ABI.ERC20,
        functionName: "allowance",
        args: [address, contractList.swaptoken],
      },
      {
        address: contractList.swaptoken,
        abi: ABI.SwapToken,
        functionName: "totalSwapAccounts",
        args: [],
      },
      {
        address: contractList.swaptoken,
        abi: ABI.SwapToken,
        functionName: "totalSwapOf",
        args: [address],
      },
      {
        address: contractList.usdt,
        abi: ABI.ERC20,
        functionName: "balanceOf",
        args: [address],
      },
    ],
    watch: true,
    enabled: typeof walletIndex == "number",
  });
  const baseContractInfo: ContractInfo = {
    walletIndex: 0,
    walletAccount: "",
    purchasable: BigNumber.from(0),
    walletPrice: BigNumber.from(0),
    walletMaxSwap: BigNumber.from(0),
    walletSwapOf: BigNumber.from(0),
    totalSwapOf: BigNumber.from(0),
    totalSwapAccounts: BigNumber.from(0),
    allowance: BigNumber.from(0),
    usdtBalance: BigNumber.from(0),
  };
  const [contractInfo, setContractInfo] = useState(baseContractInfo);
  const formatToBN = (v: any) => {
    try {
      return BigNumber.from(v);
    } catch (error) {
      return BigNumber.from(0);
    }
  };
  useEffect(() => {
    if (contract_reads.isSuccess && contract_reads.data) {
      const req = contract_reads.data.map((item: any) => String(item));
      let newInfo: ContractInfo = baseContractInfo;
      newInfo.walletIndex = walletIndex;
      newInfo.walletAccount = req[0];
      newInfo.purchasable = formatToBN(req[1]);
      newInfo.walletPrice = formatToBN(req[2]);
      newInfo.walletMaxSwap = formatToBN(req[3]);
      newInfo.walletSwapOf = formatToBN(req[4]);
      newInfo.allowance = formatToBN(req[5]);
      newInfo.totalSwapAccounts = formatToBN(req[6]);
      newInfo.totalSwapOf = formatToBN(req[7]);
      newInfo.usdtBalance = formatToBN(req[8]);
      setContractInfo({ ...newInfo });
    }
  }, [contract_reads.data]);

  return (
    <>
      <Head>
        <title>USDT SWAP App</title>
        <meta content="USDT SWAP App by @kyrie" name="description" />
        <link href="/logo.png" rel="icon" />
      </Head>

      {domLoaded && (
        <div className={style.App}>
          <div className={style.container}>
            <header>
              <HeaderNav />
            </header>
            <main className={style.main_content}>
              <section className={style.page_content}>
                <div className={style.part_left}>
                  <ArticleSection />
                  <SocialUrlList />
                  <TokenInfoList contractInfo={contractInfo} contractList={contractList} />
                </div>
                <div className={style.part_right}>
                  <div className={style.part_right_top}>
                    <div className={style.row_icon}>
                      <Image src={logo} alt="logo" />
                      <Image src={icon_bnb} alt="icon_bnb" />
                    </div>
                    <div className={style.part_right_top_content}>
                      {onFinish ? (
                        <>
                          <div className={style.row_icon_active}>
                            <Image src={active_logo} alt="logo" />
                          </div>
                          <ProgressBar contractInfo={contractInfo} />
                        </>
                      ) : (
                        <>
                          <Countdown />
                        </>
                      )}
                    </div>
                  </div>
                  <div className={style.part_right_bottom}>
                    <SwapInput contractInfo={contractInfo} contractList={contractList} />
                    <NoticeBoard />
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
