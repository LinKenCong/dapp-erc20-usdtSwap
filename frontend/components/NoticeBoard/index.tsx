import { NextComponentType } from "next";
import style from "./style.module.scss";
import { Divider } from "antd";

const DividerLine = () => <Divider style={{ margin: "0.5rem 0", backgroundColor: "#505050" }} />;

const NoticItem = ({ contentText, time }: NoticInfo) => {
  return (
    <div className={style.noticItem}>
      <div className={style.noticItem_text}>{contentText}</div>
      <div className={style.noticItem_time}>{time}</div>
      <DividerLine />
    </div>
  );
};

type NoticInfo = {
  contentText: string;
  time: string;
};

const NoticeBoard: NextComponentType = () => {
  const noticInfo: NoticInfo[] = [
    {
      contentText:
        "Hello,Good morning.lady and gentleman, How do you do glod to meet you,Im Zhao Ye.gEnglish songs with other children.",
      time: "2023,02.18 15:23",
    },
    {
      contentText:
        "Hello,Good morning.lady and gentleman, How do you do glod to meet you,Im Zhao Ye.gEnglish songs with other children.",
      time: "2023,02.18 15:23",
    },
    {
      contentText:
        "Hello,Good morning.lady and gentleman, How do you do glod to meet you,Im Zhao Ye.gEnglish songs with other children.",
      time: "2023,02.18 15:23",
    },
  ];
  return (
    <>
      <div className={style.NoticeBoard}>
        <section className={style.NoticeBoard_section}>
          <h5>公告专栏</h5>
          <DividerLine />
          {noticInfo.map((item: NoticInfo, index: number) => {
            return <NoticItem key={index} contentText={item.contentText} time={item.time} />;
          })}
        </section>
      </div>
    </>
  );
};

export default NoticeBoard;
