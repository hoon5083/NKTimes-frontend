import { User } from "../../../../types/api";
import { BaseSyntheticEvent, FormEvent, useState } from "react";
import { getAuthHeader } from "../../../../utils/auth";
import { serverAxios } from "../../../../utils/commonAxios";

interface Props {
  user: User;
  setIsEditing: (value: boolean) => void;
  mutate: () => void;
}

function UserEditingForm({ user, setIsEditing, mutate }: Props) {
  const [authority, setAuthority] = useState(user.authority);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    async function submitGroup() {
      const form = e.currentTarget;
      const formElements = form
        ? (form.elements as typeof form.elements & {
          authority: HTMLInputElement;
          grade: HTMLInputElement;
          class: HTMLInputElement;
          studentId: HTMLInputElement;
          graduateYear: HTMLInputElement;
        })
        : null;
      const config = getAuthHeader(document.cookie);
      try {
        const body = {
          authority: formElements?.authority.value,
          grade: Number(formElements?.grade?.value),
          class: Number(formElements?.class?.value),
          studentId: Number(formElements?.studentId?.value),
          graduateYear: Number(formElements?.graduateYear?.value),
        };
        await serverAxios.patch(`/users/${user.id}`, body, config);
        setIsEditing(false);
        mutate();
      } catch (e) {
        const error = e as any;
        alert(error?.response?.data.message); //수정필요
        console.log(e);
      }
    }

    submitGroup();
  };

  const handleAuthority = (e: BaseSyntheticEvent) => {
    setAuthority(e.target.value);
  };

  return <form onSubmit={handleSubmit} id="auth-update">
    <div>별명: {user.nickname}</div>
    <div>
      권한:{" "}
      <select name="authority" defaultValue={user.authority} onChange={handleAuthority}>
        <option value="교사">교사</option>
        <option value="재학생">재학생</option>
        <option value="졸업생">졸업생</option>
        <option value="학생회">학생회</option>
        <option value="방송반">방송반</option>
        <option value="신문반">신문반</option>
      </select>
    </div>

    {authority === "재학생" || authority === "신문반" || authority === "방송반" || authority === "학생회" ?
      <div className="flex gap-2">
        <div><input defaultValue={user.grade || 1} className="w-10" name="grade" />학년</div>
        <div><input defaultValue={user.class || 1} className="w-10" name="class" />반</div>
        <div><input defaultValue={user.studentId || 1} className="w-10" name="studentId" />번</div>
      </div> : null
    }
    {authority === "졸업생" ? <div>졸업년도: <input defaultValue={user.graduateYear || ""} name="graduateYear" /></div> : null}
    <div>실명: {user.name}</div>
    <div>전화번호: {user.phone}</div>
    <div>email: {user.email}</div>
    <button
      type="submit"
      className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
    >
      저장
    </button>
  </form>;
}

export default UserEditingForm;