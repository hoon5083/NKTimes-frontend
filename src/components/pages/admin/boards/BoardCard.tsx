import BoardInfo from "./BoardInfo";
import { BoardDetails } from "../../../../types/api";

interface Props {
  board: BoardDetails;
  mutate: () => void;
}

function BoardCard({ board, mutate }: Props) {
  return <BoardInfo board={board} mutate={mutate} />;
}

export default BoardCard;