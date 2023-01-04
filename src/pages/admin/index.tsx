import { NextPage } from "next";
import Link from "next/link";

const Admin: NextPage = () => {
  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">관리페이지</div>
      <Link href="/admin/boards">
        <div>게시판 관리</div>
      </Link>
      <Link href="/admin/users">
        <div>유저 관리</div>
      </Link>
      {/* <Link href="/admin/popups">
        <div>팝업 관리</div>
      </Link> */}
    </div>
  );
};

export default Admin;
