import { useState } from "react";
import icon_wallet from "../../assets/icon/wallet.svg";

const ConnectWallet = () => {
  const basicText = "Connect Wallet";
  const [btnText, setBtnText] = useState(basicText);

  return (
    <button className="ConnectWallet">
      <img src={icon_wallet} alt="wallet" />
      <span>{btnText}</span>
    </button>
  );
};

export default ConnectWallet;
