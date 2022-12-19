import Link from "next/link";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  order: number;
}

function HomeVideoCard({ order }: Props) {
  return (
    <div className="flex flex-col w-full h-64 mx-2 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <Link href="/articles/4">
          <div className="flex justify-between align-bottom">
            <p className="inline-block py-2 text-lg font-bold">최신 영상 {order}</p>
            <p className="inline-block py-3 text-sm">더보기</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomeVideoCard;
