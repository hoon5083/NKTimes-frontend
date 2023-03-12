import { BoardDetails } from "../../../../types/api";
import { FormEvent } from "react";
import { getAuthHeader } from "../../../../utils/auth";
import { serverAxios } from "../../../../utils/commonAxios";

interface Props {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  board: BoardDetails;
  mutate: () => void;
}

function BoardEditingForm({ setIsEditing, board, mutate }: Props) {
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
        };
        await serverAxios.patch(`/boards/${board.id}`, body, config);
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

  return <form className="p-2 my-2 rounded-lg bg-cp-1 flex flex-col gap-2" onSubmit={handleSubmit}>
    <div>이름: <input className="border-2 border-black rounded-lg" defaultValue={board.title} name="title" /></div>
    <div>소개: <input className="border-2 border-black rounded-lg" defaultValue={board.introduction || ""}
                    name="introduction" /></div>
    <button
      type="submit"
      className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl w-fit"
    >
      저장
    </button>
  </form>;
}

export default BoardEditingForm;