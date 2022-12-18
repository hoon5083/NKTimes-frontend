import { useState } from "react";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import { User } from "../../types/api";
import Link from "next/link";

function Navbar() {
  const { logout, loggedIn } = useGoogleAuth();
  const [isLBOpen, setIsLBOpen] = useState(false);
  const [isDDOpen, setIsDDOpen] = useState(false);
  const { data } = useSWR<User>("/users/me", authFetcher);

  return (
    <div className="flex justify-between w-full h-12 mb-5 bg-cp-4">
      <div className="flex">
        <Link href="/">
          <p className="px-2 m-2 text-2xl">NKTimes</p>
        </Link>
        <button onClick={() => setIsDDOpen(!isDDOpen)}>
          <div>O</div>
        </button>
      </div>
      <div>
        <button
          className="p-0 border-none outline-none cursor-pointer"
          onClick={() => setIsLBOpen(!isLBOpen)}
          id="auth_element_user-login-trigger"
        >
          <div className="z-50 w-48 h-12 p-3 bg-transparent rounded-lg">
            {loggedIn ? data?.nickname : "Guest"}
          </div>
        </button>
        {isLBOpen && (
          <div className="justify-center w-48 rounded-md bg-cp-4">
            {loggedIn ? (
              <div onClick={logout} className="flex justify-center">
                로그아웃
              </div>
            ) : (
              <div id="auth_element_user-login-google"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
