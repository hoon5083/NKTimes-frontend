import { getAuthHeader } from "../../../../utils/auth";
import { serverAxios } from "../../../../utils/commonAxios";
import { useState } from "react";
import { BoardDetails } from "../../../../types/api";

interface Props {
  mutate: () => void;
  board: BoardDetails;
  type: string;
  setIsEditing: (value: boolean) => void;
}

function BoardInfo({ mutate, board, type, setIsEditing }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const approveBoard = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.patch(`/boards/${id}`, { isApproved: true }, config);
    location.reload();
    mutate();
  };

  const deleteBoard = (id: number) => {
    const config = getAuthHeader(document.cookie);
    serverAxios.delete(`/boards/${id}`, config);
    setIsDeleting(false);
    location.reload();
    mutate();
  };

  return <div className="p-2 my-2 rounded-lg bg-cp-1">
    <div>이름: {board.title}</div>
    <div>소개: {board.introduction}</div>
    {type !== "approved" ? (
      <div>
        신청인: {board.applicant?.authority}
        {"  "}
        {board.applicant?.nickname}
      </div>
    ) : null}
    {!board.isApproved ? (
      <button
        onClick={() => {
          approveBoard(board.id);
        }}
        type="submit"
        className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
      >
        승인
      </button>
    ) : null}
    <button
      onClick={() => {
        setIsEditing(true);
      }}
      type="submit"
      className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
    >
      수정
    </button>
    {isDeleting ? (
      <button
        onClick={() => {
          deleteBoard(board.id);
        }}
        type="submit"
        className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-4 hover:shadow-xl"
      >
        확인
      </button>
    ) : (
      <button
        onClick={() => {
          setIsDeleting(true);
        }}
        type="submit"
        className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl"
      >
        삭제
      </button>
    )}
  </div>;
}

export default BoardInfo;