import { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState } from "react";
import useSWR from "swr";
import { BoardDetails, PagedApiResponse } from "../../types/api";
import { getAuthHeader } from "../../utils/auth";
import { serverAxios } from "../../utils/commonAxios";
import { authFetcher } from "../../utils/fetcher";

const AdminBoards: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();
  const [type, setType] = useState("all");
  const { data, mutate } = useSWR<PagedApiResponse<BoardDetails>>(
    `/boards?pageNumber=${pageIndex}&pageSize=20` +
      (type === "all" ? "&viewAll=true" : "") +
      (type === "pending" ? "&isPending=true" : ""),
    authFetcher
  );

  const [deletingNum, setDeletingNum] = useState(-1);

  const approveBoard = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.patch(`/boards/${id}`, { isApproved: true }, config);
    location.reload();
    mutate();
  };

  const deleteBoard = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.delete(`/boards/${id}`, config);
    setDeletingNum(-1);
    location.reload();
    mutate();
  };

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
      {data?.content.map((board, index: number) => {
        return (
          <div key={index} className="p-2 my-2 rounded-lg bg-cp-1">
            <div className="mb-2">이름: {board.title}</div>
            <div>소개: {board.introduction}</div>
            {type !== "approved" ? (
              <div>
                신청인: {board.applicant?.authority}
                {"  "}
                {board.applicant?.nickname}
              </div>
            ) : null}
            {!board.isApproved ? (
              <button
                onClick={() => {
                  approveBoard(board.id);
                }}
                type="submit"
                className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5"
              >
                승인
              </button>
            ) : null}
            {deletingNum === index ? (
              <button
                onClick={() => {
                  deleteBoard(board.id);
                }}
                type="submit"
                className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-4"
              >
                확인
              </button>
            ) : (
              <button
                onClick={() => {
                  setDeletingNum(index);
                }}
                type="submit"
                className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5"
              >
                삭제
              </button>
            )}
          </div>
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
