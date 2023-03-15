import style from "./style.module.scss";
import { useAccount } from "wagmi";

const SwapInput = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <>
      <div className="SwapInput">
      </div>
    </>
  );
};

export default SwapInput;
