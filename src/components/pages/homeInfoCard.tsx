import Link from "next/link";

function HomeInfoCard() {
  return (
    <div className="flex flex-col w-full h-64 mx-2 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <Link href="/articles/4">
          <div className="flex justify-between align-bottom">
            <p className="inline-block py-2 text-lg font-bold">교내 공지</p>
            <p className="inline-block py-3 text-sm"></p>
          </div>
        </Link>
      </div>
      <ul className="px-2 list-none h-5/6"></ul>
    </div>
  );
}

export default HomeInfoCard;
