import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import useSWRImmutable from "swr";
import useSWR from "swr";
import ArticleBrief from "../../../components/pages/articles/articleBrief";
import { ARTICLES_PAGE_SIZE } from "../../../constants/articles";
import { Article, Board, PagedApiResponse, User } from "../../../types/api";
import { authFetcher } from "../../../utils/fetcher";

const ArticleList: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pageIndex, setPageIndex] = useState(1);
  const [criteria, setCriteria] = useState("keyword");
  const [keyword, setKeyword] = useState("");
  const { board, error } = {
    board: useSWRImmutable<Board>(`/boards/${id}`, authFetcher).data,
    error: useSWRImmutable<Board>(`/boards/${id}`, authFetcher).error,
  };
  if (error) {
    router.replace("/404");
  }
  const user = useSWRImmutable<User>(`/users/me`, authFetcher).data;
  const searchQuery = keyword !== "" ? `&${criteria}=${keyword}` : "";
  const { data } = useSWR<PagedApiResponse<Article>>(
    `/articles/${id}?pageSize=${ARTICLES_PAGE_SIZE}&pageNumber=${pageIndex}` + searchQuery,
    authFetcher,
  );
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form
      ? (form.elements as typeof form.elements & {
        criteria: HTMLInputElement;
        keyword: HTMLInputElement
      })
      : null;
    setCriteria(formElements!.criteria.value);
    setKeyword(formElements!.keyword.value);
  };

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
      <form onSubmit={handleSearch} className="flex justify-end w-11/12 gap-2 mt-2">
        <select name="criteria" className="p-1 px-2 rounded-lg">
          <option value="keyword">제목+내용</option>
          <option value="authorNickname">작성자</option>
        </select>
        <input name="keyword" className="h-8 p-1 rounded-lg" />
        <button className="px-4 py-1 text-white rounded-lg w-fit bg-cp-5 hover:shadow-xl">
          검색
        </button>
      </form>
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
