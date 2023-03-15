import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import icon_logo from "../../assets/logo/logo.png";
import icon_language from "../../assets/icon/language.svg";
import Image from "next/image";
import style from "./style.module.scss";

const HeaderNav = () => {
  return (
    <>
      <div className={style.HeaderNav}>
        <div className={style.logo}>
          <Image src={icon_logo} alt="logo" />
        </div>
        <div className={style.btn_list}>
          <button>
            <Image src={icon_language} alt="language" />
          </button>
          <ConnectButton chainStatus="icon" />
        </div>
      </div>
    </>
  );
};

export default HeaderNav;
