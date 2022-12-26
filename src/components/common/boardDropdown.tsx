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
    <div className="absolute grid w-screen grid-cols-4 p-10 h-fit bg-cp-5 top-12">
      {data?.content.map((board, index: number) => {
        return (
          <Link key={index} href={"/articles/" + board.id}>
            <button
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
  );
}

export default BoardDropdown;
