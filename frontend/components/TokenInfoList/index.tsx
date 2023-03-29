import type { NextComponentType } from "next";
import { Descriptions } from "antd";
import { useEffect, useState } from "react";
import style from "./style.module.scss";
import {
  CURRENT_CONTRACT,
  TOKEN_INFO_MAP,
  ABI,
  CURRENT_CONTRACT_SWAPTOKEN,
} from "../../constants";
import { useAccount, useContractRead, useContractReads } from "wagmi";
import { fromEth } from "../../utils";
import { BigNumber } from "ethers";

const SwapToken = {
  address: CURRENT_CONTRACT.swaptoken,
  ...TOKEN_INFO_MAP.swapToken,
};

const ItemStyle_Address = { color: "#F7D358" };
const SwapTokenContractAddress = CURRENT_CONTRACT_SWAPTOKEN;

const TokenInfoList: NextComponentType = () => {
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
        functionName: "getWalletAccout",
        args: [contract_walletIndex.data],
      },
    ],
    watch: true,
  });

  const [poolAddress, setPoolAddress] = useState(
    "0x000000000000000000000000000000000000test"
  );
  useEffect(() => {
    if (contract_reads.data) {
      setPoolAddress(String(contract_reads.data[0]));
    }
  }, [contract_reads.data]);

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
            {poolAddress}
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
