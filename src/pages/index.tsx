import type { NextPage } from "next";
import HomeArticleCard from "../components/pages/homeArticleCard";
import HomeInfoCard from "../components/pages/homeInfoCard";
import HomeLoginCard from "../components/pages/homeLoginCard";
import HomeMainArticleCard from "../components/pages/homeMainArticleCard";
import HomeVideoCard from "../components/pages/homeVideoCard";
import MainBoardListCard from "../components/pages/MainBoardListCard";

const Home: NextPage = () => {
  return (
    <div>
      <div
        className="grid w-[375px] mx-auto grid-cols-1 md:grid-cols-2 md:w-[750px] justify-items-center justify-self-center gap-x-4">
        <HomeInfoCard />
        <HomeMainArticleCard title="기사" url="/articles/2" route="/articles/2" />
        <MainBoardListCard />
        <HomeVideoCard order={1} />
        <HomeVideoCard order={2} />
        <HomeArticleCard title="자유게시판" url="/articles/3" route="/articles/3" />
        <HomeLoginCard />
      </div>
    </div>
  );
};

export default Home;
