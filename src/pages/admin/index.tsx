import { NextPage } from "next";
import Link from "next/link";

const Admin: NextPage = () => {
  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">관리페이지</div>
      <div className="flex flex-col gap-2 ">
        <Link href="/admin/boards">
          <button className="p-1 px-2 text-white rounded-lg w-fit bg-cp-5 hover:shadow-xl">
            게시판 관리
          </button>
        </Link>
        <Link href="/admin/users">
          <button className="p-1 px-2 text-white rounded-lg w-fit bg-cp-5 hover:shadow-xl">
            유저 관리
          </button>
        </Link>
        {/* <Link href="/admin/popups">
        <div>팝업 관리</div>
      </Link> */}
      </div>
    </div>
  );
};

export default Admin;
