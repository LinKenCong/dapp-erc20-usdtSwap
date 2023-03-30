import { NextComponentType } from "next";
import { LoadingOutlined } from "@ant-design/icons";
const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const NetwrokLoading: NextComponentType = () => {
  return (
    <>
      <div
        style={{
          padding: "2rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loadIcon}
        <span style={{ paddingLeft: "1rem", fontSize: "0.8rem" }}>{`Netwrok Loading...`}</span>
      </div>
    </>
  );
};

export default NetwrokLoading;
