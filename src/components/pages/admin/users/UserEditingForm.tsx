import { User } from "../../../../types/api";
import { FormEvent } from "react";
import { getAuthHeader } from "../../../../utils/auth";
import { serverAxios } from "../../../../utils/commonAxios";

interface Props {
  user: User;
  setIsEditing: (value: boolean) => void;
  mutate: () => void;
}

function UserEditingForm({ user, setIsEditing, mutate }: Props) {
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

  return <form onSubmit={handleSubmit} id="auth-update">
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

    {user.authority === "재학생" &&
      <div>
        <div>{user.grade}학년</div>
        <div>{user.class}반</div>
        <div>{user.studentId}번</div>
      </div>
    }
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