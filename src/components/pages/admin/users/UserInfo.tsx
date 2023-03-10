import { User } from "../../../../types/api";
import { getAuthHeader } from "../../../../utils/auth";
import { serverAxios } from "../../../../utils/commonAxios";
import { useState } from "react";

interface Props {
  user: User;
  isEditing: boolean;
  mutate: () => void;
  setIsEditing: (value: boolean) => void;
}

function UserInfo({ user, isEditing, mutate, setIsEditing }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const approveUser = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.patch(`/users/${id}`, { isApproved: true }, config);
    location.reload();
    mutate();
  };

  const deleteUser = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.delete(`/users/${id}`, config);
    setIsDeleting(false);
    location.reload();
    mutate();
  };

  return (<div>
    <div>별명: {user.nickname}</div>
    <div>권한: {user.authority}</div>
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
    {!user.isApproved &&
      <button
        onClick={() => {
          approveUser(user.id);
        }}
        className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
      >
        승인
      </button>}
    {isDeleting ? (
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
          setIsDeleting(true);
        }}
        className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
      >
        삭제
      </button>
    )}
    {!isEditing && <button
      onClick={() => setIsEditing(true)}
      className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
    >
      변경
    </button>}
  </div>);
}

export default UserInfo;