import { useState } from "react";
import HeaderNav from "./components/HeaderNav";
import ArticleSection from "./components/ArticleSection";
import TokenInfoList from "./components/TokenInfoList";
import SocialUrlList from "./components/SocialUrlList";
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
        <main className="main_conten">
          <div>
            <div className="part_left">
              <ArticleSection />
              <SocialUrlList />
              <TokenInfoList />
            </div>
            <div className="part_right"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
