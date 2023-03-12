import Link from "next/link";

function MainBoardListCard() {
  return (
    <div className="flex flex-col justify-center w-full h-64 col-span-1 mx-2 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <Link href="boards">
          <div className="flex justify-between align-bottom">
            <p className="inline-block py-2 text-lg font-bold">주요 게시판</p>
            <p className="inline-block py-3 text-sm cursor-pointer hover:font-bold">더보기</p>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-3 w-full h-full p-3 pb-28 gap-y-2">
        <Link href="articles/1">
          <div className="hover:font-bold cursor-pointer">공지</div>
        </Link>
        <Link href="articles/2">
          <div className="hover:font-bold cursor-pointer">기사</div>
        </Link>
        <Link href="articles/3">
          <div className="hover:font-bold cursor-pointer">자유게시판</div>
        </Link>
        <Link href="articles/4">
          <div className="hover:font-bold cursor-pointer">영상 자료실</div>
        </Link>
        <Link href="articles/5">
          <div className="hover:font-bold cursor-pointer">남강 게시판</div>
        </Link>
        <Link href="articles/8">
          <div className="hover:font-bold cursor-pointer">후배사랑장학회</div>
        </Link>
        <Link href="articles/10">
          <div className="hover:font-bold cursor-pointer">신문반</div>
        </Link>
        <Link href="articles/11">
          <div className="hover:font-bold cursor-pointer">방송반</div>
        </Link>
        <Link href="articles/12">
          <div className="hover:font-bold cursor-pointer">학생회</div>
        </Link>
      </div>
    </div>
  );
}

export default MainBoardListCard;
