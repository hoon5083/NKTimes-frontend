import BoardInfo from "./BoardInfo";
import { BoardDetails } from "../../../../types/api";
import { useState } from "react";
import BoardEditingForm from "./BoardEditingForm";

interface Props {
  board: BoardDetails;
  mutate: () => void;
  type: string;
}

function BoardCard({ board, mutate, type }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  return (!isEditing ?
      <BoardInfo board={board} mutate={mutate} type={type} setIsEditing={setIsEditing} /> :
      <BoardEditingForm board={board} isEditing={isEditing} setIsEditing={setIsEditing} mutate={mutate} />
  );
}

export default BoardCard;