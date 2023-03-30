import { NextComponentType } from "next";
import style from "./style.module.scss";
import { Statistic } from "antd";
import { COUNTDOWN } from "../../constants";
import { useLocalization } from "../../localization";

const Countdown: NextComponentType = () => {
  const { t } = useLocalization();

  const { Countdown } = Statistic;

  const deadline = COUNTDOWN.deadline; // UTC

  return (
    <>
      <div className={style.Countdown}>
        <div className={style.text_content}>
          <Countdown
            className={style.text_time}
            title={t("label_countdown_title")}
            value={deadline}
            format={t("label_countdown_format") || "D 天 H 时 m 分 s 秒"}
          />
        </div>
      </div>
    </>
  );
};

export default Countdown;
