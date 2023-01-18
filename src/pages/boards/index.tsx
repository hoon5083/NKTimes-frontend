import { NextPage } from "next";
import { Board, PagedApiResponse } from "../../types/api";
import { authFetcher } from "../../utils/fetcher";
import useSWR from "swr";
import Link from "next/link";

const Boards: NextPage = () => {
  const { data } = useSWR<PagedApiResponse<Board>>(`/boards?pageNumber=1&pageSize=50`, authFetcher);
  return (
    <div className="min-h-[70vh] flex flex-col items-center gap-8">
      <div className="text-4xl font-bold">게시판 전체보기</div>
      <div className="grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        {data?.content.map((board, index: number) => {
          return (
            <Link href={`articles/${board.id}`} key={index}>
              <button className="text-center hover:font-bold">{board.title}</button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Boards;
