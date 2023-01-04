import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { arrayBuffer } from "stream/consumers";
import useSWRImmutable from "swr";
import useSWR from "swr";
import ArticleBrief from "../../../components/pages/boards/articleBrief";
import { ARTICLES_PAGE_SIZE } from "../../../constants/articles";
import useGoogleAuth from "../../../hooks/useGoogleAuth";
import { Article, Board, PagedApiResponse, User } from "../../../types/api";
import { authFetcher } from "../../../utils/fetcher";

const ArticleList: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pageIndex, setPageIndex] = useState(1);
  const { board, error } = {
    board: useSWRImmutable<Board>(`/boards/${id}`, authFetcher).data,
    error: useSWRImmutable<Board>(`/boards/${id}`, authFetcher).error,
  };
  if (error) {
    router.replace("/404");
  }
  const user = useSWRImmutable<User>(`/users/me`, authFetcher).data;
  const { data } = useSWR<PagedApiResponse<Article>>(
    `/articles/${id}?pageSize=${ARTICLES_PAGE_SIZE}&pageNumber=${pageIndex}`,
    authFetcher
  );

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-4xl font-bold sm:text-6xl w-fit">{board?.title}</div>
      <div className="mx-auto my-10 text-lg font-medium sm:text-xl w-fit">
        {board?.introduction}
      </div>
      {board?.whitelist.includes(String(user?.authority)) ? (
        <div className="flex justify-end w-11/12 mx-auto">
          {user?.isApproved ? (
            <Link href={`/articles/${id}/write`}>
              <button className="px-4 py-1 text-white rounded-lg w-fit bg-cp-5 hover:shadow-xl">
                글쓰기
              </button>
            </Link>
          ) : null}
        </div>
      ) : null}
      {data?.content && data?.content.length > 0 ? (
        data?.content.map((article, index: number) => {
          return <ArticleBrief key={index} article={article} boardId={Number(id)} />;
        })
      ) : (
        <div>글이 없습니다. 여러분의 이야기를 채워주세요!</div>
      )}
      <div className="flex justify-center gap-6">
        {pageIndex > 1 ? (
          <button onClick={() => setPageIndex(pageIndex - 1)} className="hover:font-bold">
            Previous
          </button>
        ) : null}
        {pageIndex < (data?.totalPages as number) ? (
          <button onClick={() => setPageIndex(pageIndex + 1)} className="hover:font-bold">
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ArticleList;
