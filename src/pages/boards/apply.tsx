import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { getAuthHeader } from "../../utils/auth";
import { serverAxios } from "../../utils/commonAxios";

const AddBoard: NextPage = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function submitGroup() {
      const form = e.currentTarget;
      const formElements = form
        ? (form.elements as typeof form.elements & {
            title: HTMLInputElement;
            introduction: HTMLInputElement;
          })
        : null;
      const config = getAuthHeader(document.cookie);
      try {
        const body = {
          title: formElements?.title.value,
          introduction: formElements?.introduction.value,
          whitelist: ["관리자", "교사", "졸업생", "학생회", "방송반", "신문반", "재학생"],
        };
        const res = await serverAxios.post(`/boards`, body, config);
        alert("감사합니다! 관리자의 승인을 기다려주세요 :)");
        router.replace("/");
      } catch (e) {
        console.log(e);
      }
    }
    submitGroup();
  };
  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-4xl font-bold sm:text-6xl w-fit">게시판 신청하기</div>
      <div className="mx-auto my-10 text-lg font-medium sm:text-xl w-fit">
        게시판을 신청하기 위해 정보를 입력해주세요
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div>게시판 이름을 입력해주세요.</div>
          <input name="title" className="w-1/2 h-8 p-1 mb-4 rounded-lg" />
          <div>게시판 소개를 입력해주세요</div>
          <input name="introduction" className="h-16 p-1 rounded-lg" />
          <div className="flex justify-center">
            <button
              type="submit"
              className="p-1 px-2 my-10 text-white rounded-lg bg-cp-5 w-fit hover:shadow-xl"
            >
              신청하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBoard;
