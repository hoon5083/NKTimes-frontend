import { NextPage } from "next";
import { BaseSyntheticEvent, useState } from "react";
import useSWR from "swr";
import { PagedApiResponse, User } from "../../types/api";
import { authFetcher } from "../../utils/fetcher";
import UserCard from "../../components/pages/admin/users/UserCard";

const AdminUsers: NextPage = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [type, setType] = useState("all");
  const [authority, setAuthority] = useState("all");
  const [grade, setGrade] = useState(0);
  const [_class, setClass] = useState(0);
  const key = `/users?pageNumber=${pageIndex}&pageSize=20` + (type === "pending" ? "&isPending=true" : "") + (authority !== "all" ? `&authority=${authority}` : "") + (grade !== 0 ? `&grade=${grade}` : "") + (_class !== 0 ? `&class=${_class}` : "");

  const { data, mutate } = useSWR<PagedApiResponse<User>>(
    key,
    authFetcher,
  );
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
        <select onChange={handleGrade} className="p-1 px-2 결rounded-lg">
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
          <UserCard key={user.id} user={user} mutate={mutate} />
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
