import { NextComponentType } from "next";
import style from "./style.module.scss";
import { Divider } from "antd";
import { useLocalization } from "../../localization";

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
  // translation
  const { t } = useLocalization();
  const noticInfo: NoticInfo[] = [
    {
      contentText: t("notice_list_1"),
      time: "",
    },
    {
      contentText: t("notice_list_2"),
      time: "",
    },
    {
      contentText: t("notice_list_3"),
      time: "",
    },
  ];
  return (
    <>
      <div className={style.NoticeBoard}>
        <section className={style.NoticeBoard_section}>
          <h5>{t("title_notice_board")}</h5>
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
