import { NextComponentType } from "next";
import style from "./style.module.scss";
import { useAccount } from "wagmi";
import { Input, Divider, Button } from "antd";

const { Search } = Input;

const SwapInput: NextComponentType = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const onSearch = (value: string) => console.log(value);

  return (
    <>
      <div className={style.SwapInput}>
        <section className={style.SwapInput_section}>
          <h5>购买数量</h5>
          <Search
            size="large"
            className={style.item_input}
            enterButton={"Max"}
            placeholder="0.00"
            onSearch={onSearch}
          />
          <Button size="large" className={style.item_btn}>
            立即购买
          </Button>
        </section>
        <section className={style.SwapInput_section}>
          <h5>状态详情</h5>
          <Divider style={{ margin: "0.5rem 0", backgroundColor: "#505050" }} />
          <table className={style.info_table}>
            <tbody>
              <tr>
                <td>Current Rat</td>
                <td>2</td>
              </tr>
              <tr>
                <td>贡献者兰数</td>
                <td>2</td>
              </tr>
              <tr>
                <td>您购买的</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default SwapInput;
