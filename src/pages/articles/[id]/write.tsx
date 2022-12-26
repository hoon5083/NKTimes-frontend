import { NextPage } from "next";
import ArticleInputSection from "../../../components/pages/articles/articleInputSection";

const ArticleWrite: NextPage = () => {
  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mb-20">
        <div className="mx-auto my-10 text-4xl font-bold w-fit">글쓰기</div>
        <div className="flex mx-4 my-8"></div>
        <ArticleInputSection />
      </div>
    </div>
  );
};

export default ArticleWrite;
