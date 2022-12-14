import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  url: string;
  route: string;
}

function HomeVideoCard({ title, route }: Props) {
  return (
    <div className="flex flex-col w-full h-64 mx-0 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <div className="flex justify-between align-bottom">
          <p className="inline-block py-2 text-lg font-bold">영상 링크실</p>
          <p className="inline-block py-2 text-sm"></p>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default HomeVideoCard;
