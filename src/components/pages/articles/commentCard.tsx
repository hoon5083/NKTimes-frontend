import { HTMLAttributes } from "react";
import { Author } from "../../../types/api";

interface Props extends HTMLAttributes<HTMLDivElement> {
  author: Author;
  date: Date;
  content: string;
  commentId: number;
}

function CommentCard({ author, date, content }: Props) {
  return (
    <div className="w-full p-4 px-5 mb-2 rounded-lg h-fit min-h-36 bg-cp-1 last:mb-0">
      <div className="flex flex-col justify-between w-full mb-2 sm:flex-row">
        <div className="font-bold w-fit">
          {author.authority} {author.nickname}
        </div>
        <div className="font-light text-gray-500">{date.toLocaleString()}</div>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default CommentCard;
