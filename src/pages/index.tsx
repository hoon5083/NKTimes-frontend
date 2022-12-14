import type { NextPage } from "next";
import HomeArticleCard from "../components/pages/homeArticleCard";
import HomeVideoCard from "../components/pages/homeVideoCard";

const Home: NextPage = () => {
  return (
    <div>
      <div className="grid w-11/12 grid-cols-1 mx-auto justify-items-center justify-self-center">
        <HomeArticleCard title="공지" url="/articles/1" route="/articles/1" />
        <HomeArticleCard title="기사" url="/articles/2" route="/articles/2" />
        <HomeArticleCard title="자유게시판" url="/articles/3" route="/articles/3" />
        <HomeVideoCard />
      </div>
    </div>
  );
};

export default Home;
