import { useState } from "react";
import icon_logo from "../../assets/logo/logo.png";
import icon_language from "../../assets/icon/language.svg";
import ConnectWallet from "./ConnectWallet";
import "./style.scss";

const HeaderNav = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="HeaderNav">
      <div className="logo">
        <img src={icon_logo} alt="logo" />
      </div>
      <div className="btn_list">
        <button>
          <img src={icon_language} alt="language" />
        </button>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default HeaderNav;
