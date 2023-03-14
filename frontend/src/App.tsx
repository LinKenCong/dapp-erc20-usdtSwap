import { useState } from "react";
import HeaderNav from "./components/HeaderNav";
import ArticleSection from "./components/ArticleSection";
import TokenInfoList from "./components/TokenInfoList";
import SocialUrlList from "./components/SocialUrlList";
import SwapInput from "./components/SwapInput";
import Countdown from "./components/Countdown";
import ProgressBar from "./components/ProgressBar";
import NoticeBoard from "./components/NoticeBoard";
import "antd/dist/reset.css";
import "./App.scss";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="container">
        <header>
          <HeaderNav />
        </header>
        <main className="main_content">
          <section className="page_content">
            <div className="part_left">
              <ArticleSection />
              <SocialUrlList />
              <TokenInfoList />
            </div>
            <div className="part_right">
              <div className="part_right_top">
                <div className="row_icon"></div>
                <Countdown />
                <ProgressBar />
              </div>
              <div className="part_right_bottom">
                <SwapInput />
                <NoticeBoard />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
