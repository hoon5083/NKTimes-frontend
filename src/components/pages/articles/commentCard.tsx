import { HTMLAttributes } from "react";
import { Author } from "../../../types/api";

interface Props extends HTMLAttributes<HTMLDivElement> {
  author: Author;
  date: Date;
  content: string;
}

function CommentCard({ author, date, content }: Props) {
  return (
    <div className="w-full p-4 px-5 mb-2 rounded-lg h-fit min-h-36 bg-cp-1 last:mb-0">
      <div className="flex justify-between w-full mb-2">
        <div className="w-1/5 font-bold">
          {author.authority} {author.nickname}
        </div>
        <div className="font-light text-gray-500">{date.toLocaleString()}</div>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default CommentCard;
