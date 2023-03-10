import { NextPage } from "next";
import { BaseSyntheticEvent, FormEvent, useState } from "react";
import useSWR from "swr";
import { PagedApiResponse, User } from "../../types/api";
import { getAuthHeader } from "../../utils/auth";
import { serverAxios } from "../../utils/commonAxios";
import { authFetcher } from "../../utils/fetcher";

const AdminUsers: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [type, setType] = useState("all");
  const [authority, setAuthority] = useState("all");
  const [grade, setGrade] = useState(0);
  const [_class, setClass] = useState(0);
  const [deletingNum, setDeletingNum] = useState(-1);
  const [editingNum, setEditingNum] = useState(-1);
  const key = `/users?pageNumber=${pageIndex}&pageSize=20` + (type === "pending" ? "&isPending=true" : "") + (authority !== "all" ? `&authority=${authority}` : "") + (grade !== 0 ? `&grade=${grade}` : "") + (_class !== 0 ? `&class=${_class}` : "");

  const { data, mutate } = useSWR<PagedApiResponse<User>>(
    key,
    authFetcher,
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

  const handleAuthSelect = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setAuthority(e.target.value);
  };
  const handleGrade = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setGrade(Number(e.target.value));
  };
  const handleClass = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setClass(Number(e.target.value));
  };

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">유저 관리페이지</div>
      <form className="flex gap-2">
        <select onChange={handleType} className="p-1 px-2 rounded-lg">
          <option value="all">모두</option>
          <option value="pending">대기중</option>
        </select>
        <select onChange={handleAuthSelect} className="p-1 px-2 rounded-lg">
          <option value="all">권한</option>
          <option value="교사">교사</option>
          <option value="학생회">학생회</option>
          <option value="신문반">신문반</option>
          <option value="방송반">방송반</option>
          <option value="재학생">재학생</option>
        </select>
        <select onChange={handleGrade} className="p-1 px-2 rounded-lg">
          <option value={0}>학년</option>
          <option value={1}>1학년</option>
          <option value={2}>2학년</option>
          <option value={3}>3학년</option>
        </select>
        <select onChange={handleClass} className="p-1 px-2 rounded-lg">
          <option value={0}>반</option>
          <option value={1}>1반</option>
          <option value={2}>2반</option>
          <option value={3}>3반</option>
          <option value={4}>4반</option>
          <option value={5}>5반</option>
          <option value={6}>6반</option>
          <option value={7}>7반</option>
          <option value={8}>8반</option>
          <option value={9}>9반</option>
          <option value={10}>10반</option>
        </select>
      </form>
      {data?.content.map((user) => {
        return (
          <div key={user.id} className="p-2 my-2 rounded-lg bg-cp-1">
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
                {deletingNum === user.id ? (
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
                      setDeletingNum(user.id);
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
