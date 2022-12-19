import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  authority: string;
  nickname: string;
  dateString: string;
  content: string;
}

function TalkingCard({ authority, nickname, dateString, content }: Props) {
  return (
    <div className="w-full p-4 px-5 mb-2 rounded-lg h-fit min-h-36 bg-cp-1 last:mb-0">
      <div className="flex justify-between w-full mb-2">
        <div className="w-1/5 font-bold">
          {authority} {nickname}
        </div>
        <div className="font-light text-gray-500">{dateString}</div>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default TalkingCard;
