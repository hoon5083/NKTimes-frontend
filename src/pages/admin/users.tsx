import { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, useState } from "react";
import useSWR from "swr";
import { BoardDetails, PagedApiResponse, User } from "../../types/api";
import { getAuthHeader } from "../../utils/auth";
import { serverAxios } from "../../utils/commonAxios";
import { authFetcher } from "../../utils/fetcher";

const AdminUsers: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [type, setType] = useState("all");
  const [deletingNum, setDeletingNum] = useState(-1);

  const { data, mutate } = useSWR<PagedApiResponse<User>>(
    `/users?pageNumber=${pageIndex}&pageSize=20` + (type === "pending" ? "&isPending=true" : ""),
    authFetcher
  );

  const approveUser = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.patch(`/users/${id}`, { isApproved: true }, config);
    location.reload();
    mutate();
  };

  const deleteUser = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.delete(`/users/${id}`, config);
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
      <div className="mx-auto my-10 text-6xl font-bold w-fit">유저 관리페이지</div>
      <form>
        <select onChange={handleType} className="p-1 px-2 rounded-lg">
          <option value="all">모두</option>
          <option value="pending">대기중</option>
        </select>
      </form>
      {data?.content.map((user, index: number) => {
        return (
          <div key={index} className="p-2 my-2 rounded-lg bg-cp-1">
            <div>별명: {user.nickname}</div>
            <div>권한: {user.authority}</div>
            {user.authority === "재학생" ? (
              <div>
                <div>{user.grade}학년</div>
                <div>{user.class}반</div>
                <div>{user.studentId}번</div>
              </div>
            ) : null}
            <div>실명: {user.name}</div>
            <div>전화번호: {user.phone}</div>
            <div>email: {user.email}</div>
            {!user.isApproved ? (
              <button
                onClick={() => {
                  approveUser(user.id);
                }}
                type="submit"
                className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
              >
                승인
              </button>
            ) : null}
            {deletingNum === index ? (
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
                type="submit"
                className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-4 hover:shadow-xl"
              >
                확인
              </button>
            ) : (
              <button
                onClick={() => {
                  setDeletingNum(index);
                }}
                type="submit"
                className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
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

export default AdminUsers;
