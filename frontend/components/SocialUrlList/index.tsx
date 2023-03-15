import Image from "next/image";
import icon_discord from "../../assets/icon/discord.svg";
import icon_twitter from "../../assets/icon/twitter.svg";
import icon_youtube from "../../assets/icon/youtube.svg";
import icon_telegram from "../../assets/icon/telegram.svg";
import style from "./style.module.scss";

const IconList = [
  {
    img: icon_twitter,
    bgColor: "#E0F2F7",
  },
  {
    img: icon_discord,
    bgColor: "#F2EFFB",
  },
  {
    img: icon_youtube,
    bgColor: "#F8E0E0",
  },
  {
    img: icon_telegram,
    bgColor: "#E0F8F7",
  },
];

const SocialUrlList = () => {
  const IconItem = (url: any) => <Image src={url} alt="icon" />;

  return (
    <>
      <div className={style.SocialUrlList}>
        <ul>
          {IconList.map((item: any, index) => (
            <li style={{ backgroundColor: item.bgColor }}>
              <Image src={item.img} key={index} alt="icon" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SocialUrlList;
