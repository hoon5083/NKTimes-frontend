import { NextPage } from "next";
import { BaseSyntheticEvent, useState } from "react";
import useSWR from "swr";
import { BoardDetails, PagedApiResponse } from "../../types/api";
import { authFetcher } from "../../utils/fetcher";
import BoardCard from "../../components/pages/admin/boards/BoardCard";

const AdminBoards: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [type, setType] = useState("all");
  const { data, mutate } = useSWR<PagedApiResponse<BoardDetails>>(
    `/boards?pageNumber=${pageIndex}&pageSize=20` +
    (type === "all" ? "&viewAll=true" : "") +
    (type === "pending" ? "&isPending=true" : ""),
    authFetcher,
  );

  const handleType = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setType(e.target.value);
  };

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">게시판 관리페이지</div>
      <form>
        <select onChange={handleType} className="p-1 px-2 rounded-lg">
          <option value="all">모두</option>
          <option value="pending">대기중</option>
          <option value="approved">승인됨</option>
        </select>
      </form>
      {data?.content.map((board) => {
        return (
          <BoardCard key={board.id} board={board} mutate={mutate} type={type} />
        );
      })}
      <div className="flex justify-center gap-6">
        {pageIndex > 1 ? (
          <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
        ) : null}
        {pageIndex < (data?.totalPages as number) ? (
          <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        ) : null}
      </div>
    </div>
  );
};

export default AdminBoards;
