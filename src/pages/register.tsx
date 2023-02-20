import { NextPage } from "next";
import { useRouter } from "next/router";
import { BaseSyntheticEvent, ChangeEvent, FormEvent, useState } from "react";
import { getAuthHeader } from "../utils/auth";
import { serverAxios } from "../utils/commonAxios";

const Register: NextPage = () => {
  const [isStudent, setIsStudent] = useState(false);
  const [isGraduate, setIsGraduate] = useState(false);
  const [file, setFile] = useState(null);
  const router = useRouter();

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
      console.log(file);
      const formElements = form
        ? (form.elements as typeof form.elements & {
          nickname: HTMLInputElement;
          name: HTMLInputElement;
          pNumber: HTMLInputElement;
          authority: HTMLInputElement;
          grade?: HTMLInputElement;
          class?: HTMLInputElement;
          number?: HTMLInputElement;
          graduateYear?: HTMLInputElement;
          middleSchool?: HTMLInputElement;
        })
        : null;
      const config = getAuthHeader(document.cookie);
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      const res = await serverAxios.post("/files", formData, config);

      try {
        const body = {
          nickname: formElements?.nickname.value,
          name: formElements?.name.value,
          phone: formElements?.pNumber.value,
          authority: formElements?.authority.value,
          grade: Number(formElements?.grade?.value),
          class: Number(formElements?.class?.value),
          studentId: Number(formElements?.number?.value),
          graduateYear: Number(formElements?.graduateYear?.value),
          fileKey: res.data.key,
        };
        await serverAxios.post(`/users`, body, config);
        alert("환영합니다! 관리자의 승인을 기다려주세요 :)");
        router.replace("/");
      } catch (e) {
        const error = e as any;
        alert(error.response.data.message); //수정필요
        console.log(e);
      }
    }

    submitGroup();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?[0]);
  };

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">환영합니다</div>
      <div className="mx-auto my-10 text-xl font-medium w-fit">
        회원가입을 완료하기 위해 추가 정보를 입력해주세요.
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>사용할 별명을 입력해주세요.</div>
            <input name="nickname" className="h-8 p-1 rounded-lg" />
            <div>실명을 입력해주세요.</div>
            <input name="name" className="h-8 p-1 rounded-lg" />
            <div>전화번호를 입력해주세요.{" ('-'없이 입력해주세요)"}</div>
            <input name="pNumber" className="h-8 p-1 rounded-lg" />
            <div>
              <div>프로필 사진을 선택하세요</div>
              <input type="file" onChange={handleChange} />
            </div>
            <div className="mt-3">(실명과 전화번호는 관리자의 승인에 사용됩니다.)</div>
            <div className="my-8">
              <div>권한을 입력해주세요.</div>
              <select name="authority" className="h-8 p-1 rounded-lg" onChange={handleAuthority}>
                <option value="교사">교사</option>
                <option value="재학생">재학생</option>
                <option value="졸업생">졸업생</option>
                <option value="학생회">학생회</option>
                <option value="방송반">방송반</option>
                <option value="신문반">신문반</option>
              </select>
            </div>
            {isStudent ? (
              <div>
                <div>학년을 선택해주세요.</div>
                <select name="grade" className="h-8 p-1 rounded-lg">
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                </select>
                <div>반을 입력해주세요.(숫자로 입력해주세요.)</div>
                <input name="class" className="h-8 p-1 rounded-lg" />
                <div>번호를 입력해주세요.</div>
                <input name="number" className="h-8 p-1 rounded-lg" />
                <div>출신 중학교를 입력해주세요.</div>
                <input name="middleSchool" className="h-8 p-1 rounded-lg" />
              </div>
            ) : null}
            {isGraduate ? (
              <div>
                <div>{"졸업년도를 입력해주세요. (예: 2022)"}</div>
                <input name="graduateYear" className="h-8 p-1 rounded-lg" />
              </div>
            ) : null}
          </div>

          <button type="submit" className="p-1 mt-5 text-white rounded-lg bg-cp-5 hover:shadow-xl">
            가입신청하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
