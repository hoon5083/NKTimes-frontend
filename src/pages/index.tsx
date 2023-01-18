import type { NextPage } from "next";
import HomeArticleCard from "../components/pages/homeArticleCard";
import HomeInfoCard from "../components/pages/homeInfoCard";
import HomeLoginCard from "../components/pages/homeLoginCard";
import HomeLunchCard from "../components/pages/homeLunchCard";
import HomeMainArticleCard from "../components/pages/homeMainArticleCard";
import HomeMainCard from "../components/pages/homeMainCard";
import HomeTalkingCard from "../components/pages/homeTalkingCard";
import HomeVideoCard from "../components/pages/homeVideoCard";

const Home: NextPage = () => {
  return (
    <div>
      <div className="grid w-[375px] mx-auto sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 md:w-[750px] 2xl:w-[1150px] justify-items-center justify-self-center gap-x-2 ">
        <HomeInfoCard />
        <HomeMainCard />
        <HomeMainArticleCard title="기사" url="/articles/2" route="/articles/2" />
        <HomeVideoCard order={1} />
        <HomeVideoCard order={2} />
        <HomeArticleCard title="자유게시판" url="/articles/3" route="/articles/3" />
        {/* <HomeInfoCard /> */}
        <HomeLoginCard />
      </div>
    </div>
  );
};

export default Home;
