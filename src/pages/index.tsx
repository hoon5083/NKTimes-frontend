import type { NextPage } from "next";
import HomeArticleCard from "../components/pages/homeArticleCard";
import HomeInfoCard from "../components/pages/homeInfoCard";
import HomeLoginCard from "../components/pages/homeLoginCard";
import HomeMainArticleCard from "../components/pages/homeMainArticleCard";
import HomeVideoCard from "../components/pages/homeVideoCard";
import MainBoardListCard from "../components/pages/MainBoardListCard";
import { useEffect, useState } from "react";
import Popup from "../components/pages/Popup";

const Home: NextPage = () => {
  const [popupOpen, setPopupOpen] = useState(true);

  useEffect(() => {
    const today = new Date().toDateString();
    const dontShowAgain = localStorage.getItem("dontShowAgain");
    if (dontShowAgain === today) {
      setPopupOpen(false);
    }
  }, []);

  const handleDontShowAgain = () => {
    const today = new Date().toDateString();
    localStorage.setItem("dontShowAgain", today);
    setPopupOpen(false);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <Popup isOpen={popupOpen} onClose={closePopup} handleDontShowAgain={handleDontShowAgain} />
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
