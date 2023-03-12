import BoardInfo from "./BoardInfo";
import { BoardDetails } from "../../../../types/api";
import { useState } from "react";

interface Props {
  board: BoardDetails;
  mutate: () => void;
  type: string;
}

function BoardCard({ board, mutate, type }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  return (!isEditing ?
      <BoardInfo board={board} mutate={mutate} type={type} /> : <div />
  );
}

export default BoardCard;