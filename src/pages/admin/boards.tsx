import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { BoardDetails, PagedApiResponse } from "../../types/api";
import { getAuthHeader } from "../../utils/auth";
import { serverAxios } from "../../utils/commonAxios";
import { authFetcher } from "../../utils/fetcher";

const AdminBoards: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const router = useRouter();
  const { data, mutate } = useSWR<PagedApiResponse<BoardDetails>>(
    `/boards?isPending=true&pageNumber=${pageIndex}&pageSize=20`,
    authFetcher
  );

  const approveBoard = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.patch(`/boards/${id}`, { isApproved: true }, config);
    mutate();
    router.replace("/admin/boards");
  };

  const deleteBoard = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.delete(`/boards/${id}`, config);
    mutate();
    router.replace("/admin/boards");
  };

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">게시판 관리페이지</div>
      {data?.content.map((board, index: number) => {
        return (
          <div key={index} className="my-2 rounded-lg bg-cp-1">
            <div className="mb-2">게시판 이름:{board.title}</div>
            <div>게시판 소개:{board.introduction}</div>
            <div>
              신청인 정보:
              {board.applicant.authority}
              {"  "}
              {board.applicant.nickname}
            </div>
            <button
              onClick={() => {
                approveBoard(board.id);
              }}
              type="submit"
              className="mt-2 mr-2"
            >
              승인
            </button>
            <button
              onClick={() => {
                deleteBoard(board.id);
              }}
              type="submit"
            >
              삭제
            </button>
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
