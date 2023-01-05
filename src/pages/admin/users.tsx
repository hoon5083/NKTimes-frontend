import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { BoardDetails, PagedApiResponse, User } from "../../types/api";
import { getAuthHeader } from "../../utils/auth";
import { serverAxios } from "../../utils/commonAxios";
import { authFetcher } from "../../utils/fetcher";

const AdminUsers: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const { data, mutate } = useSWR<PagedApiResponse<User>>(
    `/users?isPending=true&pageNumber=${pageIndex}&pageSize=20`,
    authFetcher
  );

  const router = useRouter();

  const approveUser = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.patch(`/users/${id}`, { isApproved: true }, config);
    mutate();
    router.replace("/admin/users");
  };

  const deleteUser = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.delete(`/users/${id}`, config);
    mutate();
    router.replace("/admin/users");
  };

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">유저 관리페이지</div>
      {data?.content.map((user, index: number) => {
        return (
          <div key={index} className="my-2 rounded-lg bg-cp-1">
            <div>유저 별명:{user.nickname}</div>
            <div>유저 권한:{user.authority}</div>
            {user.authority === "재학생" ? (
              <div>
                <div>{user.grade}학년</div>
                <div>{user.class}반</div>
                <div>{user.studentId}번</div>
              </div>
            ) : null}
            <div>유저 실명:{user.name}</div>
            <div>{user.phone}</div>
            <div>{user.email}</div>
            <button
              onClick={() => {
                approveUser(user.id);
              }}
              className="mt-2 mr-2"
            >
              승인
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
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

export default AdminUsers;
