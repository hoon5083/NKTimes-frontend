import { Board, PagedApiResponse } from "../../types/api";
import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  setDD: (a: boolean) => void;
}

function BoardDropdown({ setDD }: Props) {
  const { data } = useSWR<PagedApiResponse<Board>>(`/boards?pageNumber=1&pageSize=50`, authFetcher);
  return (
    <div className="absolute flex flex-col w-screen px-10 py-2 h-fit bg-cp-4 top-12">
      <div className="grid grid-cols-4">
        {data?.content.map((board, index: number) => {
          return (
            <Link key={index} href={"/articles/" + board.id}>
              <button
                className="hover:font-bold"
                onClick={() => {
                  setDD(false);
                }}
              >
                {board.title}
              </button>
            </Link>
          );
        })}
      </div>
      <Link href="/boards">
        <button
          className="mt-5 hover:font-bold"
          onClick={() => {
            setDD(false);
          }}
        >
          더보기
        </button>
      </Link>
    </div>
  );
}

export default BoardDropdown;
