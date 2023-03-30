import { NextComponentType } from "next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import icon_logo from "../../assets/logo/logo.png";
import icon_language from "../../assets/icon/language.svg";
import Image from "next/image";
import style from "./style.module.scss";
import { useLocalization } from "../../localization";
const switchLanguageTag = (current: string) => {
  return current == "en" ? "中文" : "English";
};

const HeaderNav: NextComponentType = () => {
  const { t, changeLanguage, currentLanguage } = useLocalization();

  const [toggleBtnText, setToggleBtnText] = useState(switchLanguageTag(currentLanguage()));

  const toggleLanguage = () => {
    changeLanguage(currentLanguage() == "en" ? "cn" : "en");
    setToggleBtnText(switchLanguageTag(currentLanguage()));
  };
  return (
    <>
      <div className={style.HeaderNav}>
        <div className={style.logo}>
          <Image src={icon_logo} alt="logo" />
        </div>
        <div className={style.btn_list}>
          <button className={style.btn_item_toggleLanguage} onClick={toggleLanguage}>
            <Image src={icon_language} alt="language" />
            <label>{toggleBtnText}</label>
          </button>
          <ConnectButton chainStatus="icon" />
        </div>
      </div>
    </>
  );
};

export default HeaderNav;
