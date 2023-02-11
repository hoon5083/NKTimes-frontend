import { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, FormEvent, useState } from "react";
import useSWR from "swr";
import { BoardDetails, PagedApiResponse, User } from "../../types/api";
import { getAuthHeader } from "../../utils/auth";
import { serverAxios } from "../../utils/commonAxios";
import { authFetcher } from "../../utils/fetcher";

const AdminUsers: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [type, setType] = useState("all");
  const [deletingNum, setDeletingNum] = useState(-1);
  const [editingNum, setEditingNum] = useState(-1);
  const [isStudent, setIsStudent] = useState(false);
  const [isGraduate, setIsGraduate] = useState(false);

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

  const handleAuthority = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (
      e.target.value === "재학생" ||
      e.target.value === "학생회" ||
      e.target.value === "방송반" ||
      e.target.value === "신문반"
    ) {
      setIsStudent(true);
      setIsGraduate(false);
    } else if (e.target.value === "졸업생") {
      setIsGraduate(true);
      setIsStudent(false);
    } else {
      setIsGraduate(false);
      setIsStudent(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function submitGroup() {
      const form = e.currentTarget;
      const formElements = form
        ? (form.elements as typeof form.elements & {
            authority: HTMLInputElement;
          })
        : null;
      const config = getAuthHeader(document.cookie);
      try {
        const body = {
          authority: formElements?.authority.value,
        };
        const res = await serverAxios.patch(`/users/${editingNum}`, body, config);
        setEditingNum(-1);
        mutate();
      } catch (e) {
        const error = e as any;
        alert(error?.response?.data.message); //수정필요
        console.log(e);
      }
    }
    submitGroup();
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
            {editingNum !== user.id ? (
              <div>
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
                    className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-4 hover:shadow-xl"
                  >
                    확인
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setDeletingNum(index);
                    }}
                    className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
                  >
                    삭제
                  </button>
                )}
                {editingNum === user.id ? null : (
                  <button
                    onClick={() => setEditingNum(user.id)}
                    className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
                  >
                    변경
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="auth-update">
                <div>별명: {user.nickname}</div>
                <div>
                  권한:{" "}
                  <select name="authority" defaultValue={user.authority}>
                    <option value="교사">교사</option>
                    <option value="재학생">재학생</option>
                    <option value="졸업생">졸업생</option>
                    <option value="학생회">학생회</option>
                    <option value="방송반">방송반</option>
                    <option value="신문반">신문반</option>
                  </select>
                </div>

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
                <button
                  type="submit"
                  className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
                >
                  저장
                </button>
              </form>
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
