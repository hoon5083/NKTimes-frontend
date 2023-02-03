import { NextPage } from "next";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { User } from "../../types/api";
import { getAuthHeader } from "../../utils/auth";
import { serverAxios } from "../../utils/commonAxios";
import { authFetcher } from "../../utils/fetcher";

const Mypage: NextPage = () => {
  const { data, mutate } = useSWR<User>(`/users/me`, authFetcher);
  const [isEditing, setIsEditing] = useState(false);

  const handleUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function submitGroup() {
      const form = e.currentTarget;
      const formElements = form
        ? (form.elements as typeof form.elements & {
            nickname: HTMLInputElement;
            pNumber: HTMLInputElement;
          })
        : null;
      const config = getAuthHeader(document.cookie);
      try {
        const body = {
          nickname: formElements?.nickname.value,
          phone: formElements?.pNumber.value,
        };
        const res = await serverAxios.patch(`/users/me`, body, config);
        mutate();
        setIsEditing(false);
      } catch (e) {
        const error = e as any;
        alert(error.response.data.message); //수정필요
        console.log(e);
      }
    }
    submitGroup();
  };
  return (
    <div className="min-h-[70vh] flex flex-col items-center gap-8">
      <div className="mb-20 text-4xl font-bold">마이 페이지</div>
      {!isEditing ? (
        <div className="table w-10/12">
          <div className="table-row">
            별명: <div className="table-cell">{data?.nickname}</div>
          </div>
          <div className="table-row">
            권한: <div className="table-cell">{data?.authority}</div>
          </div>
          {data?.authority === "재학생" ||
          data?.authority === "학생회" ||
          data?.authority === "신문부" ||
          data?.authority === "방송반" ? (
            <div className="table-row">
              학생정보:
              <div className="table-cell">
                {data.grade}학년 {data.class}반 {data.studentId}번
              </div>
            </div>
          ) : null}
          {data?.authority === "졸업생" ? (
            <div className="table-row">
              졸업년도: <div className="table-cell">2020년</div>
            </div>
          ) : null}
          <div className="table-row">
            전화번호: <div className="table-cell">{data?.phone}</div>
          </div>
          <div className="table-row">
            실명: <div className="table-cell">{data?.name}</div>
          </div>
          <button
            className="px-4 py-1 mt-10 text-white rounded-lg w-fit bg-cp-5 hover:shadow-xl"
            onClick={() => setIsEditing(true)}
          >
            수정하기
          </button>
        </div>
      ) : (
        <form onSubmit={handleUser} className="w-10/12">
          <div className="flex flex-col w-full gap-3">
            <div>
              별명:{" "}
              <input
                name="nickname"
                className="table-cell ml-2 rounded-md"
                defaultValue={data?.nickname}
              />
            </div>
            <div>
              전화번호:{" "}
              <input
                name="pNumber"
                className="table-cell ml-2 rounded-md"
                defaultValue={data?.phone}
              />
            </div>
            <button
              className="px-4 py-1 mt-10 text-white rounded-lg w-fit bg-cp-5 hover:shadow-xl"
              type="submit"
            >
              적용하기
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Mypage;
