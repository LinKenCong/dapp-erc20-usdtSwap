import { NextComponentType } from "next";
import style from "./style.module.scss";
import { Statistic } from "antd";
import { COUNTDOWN } from "../../constants";

const Countdown: NextComponentType = () => {
  const { Countdown } = Statistic;

  const deadline = COUNTDOWN.deadline; // UTC

  return (
    <>
      <div className={style.Countdown}>
        <div className={style.text_content}>
          <Countdown
            className={style.text_time}
            title="预售倒计时"
            value={deadline}
            format="D 天 H 时 m 分 s 秒"
          />
        </div>
      </div>
    </>
  );
};

export default Countdown;
