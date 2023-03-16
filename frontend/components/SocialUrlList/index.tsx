import { NextComponentType } from "next";
import Image from "next/image";
import icon_discord from "../../assets/icon/discord.svg";
import icon_twitter from "../../assets/icon/twitter.svg";
import icon_youtube from "../../assets/icon/youtube.svg";
import icon_telegram from "../../assets/icon/telegram.svg";
import style from "./style.module.scss";
import { SOCIAL_URL_LIST } from "../../constants";
import Link from "next/link";

const IconList = [
  {
    img: icon_twitter,
    bgColor: "#E0F2F7",
    url: SOCIAL_URL_LIST.twitter,
  },
  {
    img: icon_discord,
    bgColor: "#F2EFFB",
    url: SOCIAL_URL_LIST.discord,
  },
  {
    img: icon_youtube,
    bgColor: "#F8E0E0",
    url: SOCIAL_URL_LIST.youtube,
  },
  {
    img: icon_telegram,
    bgColor: "#E0F8F7",
    url: SOCIAL_URL_LIST.telegram,
  },
];

const SocialUrlList: NextComponentType = () => {
  const IconItem = (url: any) => <Image src={url} alt="icon" />;

  return (
    <>
      <div className={style.SocialUrlList}>
        <ul>
          {IconList.map((item: any, index) => (
            <li style={{ backgroundColor: item.bgColor }} key={index}>
              <a href={item.url} target={"_blank"}>
                <Image src={item.img} alt="icon" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SocialUrlList;
