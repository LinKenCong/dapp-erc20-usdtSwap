import { useState } from "react";
import HeaderNav from "./components/HeaderNav";
import ArticleSection from "./components/ArticleSection";
import TokenInfoList from "./components/TokenInfoList";
import SocialUrlList from "./components/SocialUrlList";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <header>
          <HeaderNav />
        </header>
        <main>
          <div>
            <div>
              <ArticleSection />
              <SocialUrlList />
              <TokenInfoList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
