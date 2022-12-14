import Link from "next/link";

function HomeVideoCard() {
  return (
    <div className="flex flex-col w-full h-64 mx-0 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <Link href="/articles/4">
          <div className="flex justify-between align-bottom">
            <p className="inline-block py-1 text-lg font-bold">영상링크실</p>
            <p className="inline-block py-2 text-sm">더보기</p>
          </div>
        </Link>
      </div>
      <ul className="h-full px-2 list-none">
        {/* <li
          key="1"
          className="flex flex-row justify-between px-1 py-1 border-b-2 border-black last:border-0"
        >
          <p>ㅁㄴㅇㄹ</p>
          <p className="text-sm text-cp-5">ㅁㄴㅇㄹ</p>
        </li> */}
      </ul>
    </div>
  );
}

export default HomeVideoCard;
