import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWRImmutable from "swr";
import useSWR from "swr";
import ArticleBrief from "../../components/pages/boards/articleBrief";
import { ARTICLES_PAGE_SIZE } from "../../constants/articles";
import { Article, Board, PagedApiResponse } from "../../types/api";
import { authFetcher } from "../../utils/fetcher";

const ArticleList: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pageIndex, setPageIndex] = useState(1);
  const board = useSWRImmutable<Board>(`/boards/${id}`, authFetcher).data;
  const { data } = useSWR<PagedApiResponse<Article>>(
    `/articles/${id}?pageSize=${ARTICLES_PAGE_SIZE}&pageNumber=${pageIndex}`,
    authFetcher
  );
  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">{board?.title}</div>
      <div className="mx-auto my-10 text-xl font-medium w-fit">{board?.introduction}</div>
      {data?.content.map((article, index: number) => {
        return <ArticleBrief key={index} article={article} />;
      })}
      <div className="flex justify-center gap-6">
        {pageIndex > 1 ? <div onClick={() => setPageIndex(pageIndex - 1)}>Previous</div> : null}
        {pageIndex < (data?.totalPages as number) ? (
          <div onClick={() => setPageIndex(pageIndex + 1)}>Next</div>
        ) : null}
      </div>
    </div>
  );
};

export default ArticleList;
