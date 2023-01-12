import { useState } from "react";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import { User } from "../../types/api";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import BoardDropdown from "./boardDropdown";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const { logout, loggedIn } = useGoogleAuth();
  const [isLBOpen, setIsLBOpen] = useState(false);
  const [isDDOpen, setIsDDOpen] = useState(false);
  const { data } = useSWR<User>(loggedIn ? "/users/me" : null, authFetcher);

  return (
    <>
      <div className="flex justify-between h-12 mb-5 bg-cp-4">
        <div className="flex">
          <Link href="/">
            <p className="px-2 m-2 text-2xl cursor-pointer">NKTimes</p>
          </Link>
          <button onClick={() => setIsDDOpen(!isDDOpen)} className="hover:text-white">
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>
        <div className="flex">
          {data?.isApproved ? (
            <Link href="/board">
              <FontAwesomeIcon
                icon={faPlus}
                className="z-50 p-3 my-1 bg-transparent rounded-lg w-fit hover:font-bold"
              />
            </Link>
          ) : null}
          <div>
            {!loggedIn || data ? (
              <button
                className="p-0 border-none outline-none cursor-pointer"
                onClick={() => setIsLBOpen(!isLBOpen)}
                id="auth_element_user-login-trigger"
              >
                <div className="z-50 h-12 p-3 bg-transparent rounded-lg w-fit hover:font-bold">
                  {loggedIn ? data?.nickname : "Guest"}
                </div>
              </button>
            ) : (
              <button
                className="p-0 border-none outline-none"
                onClick={() => {
                  logout();
                  router.replace("/");
                }}
              >
                <div className="z-50 w-48 h-12 p-3 bg-transparent rounded-lg cursor-pointer hover:font-bold">
                  로그아웃
                </div>
              </button>
            )}
            {isLBOpen && (
              <div className="justify-center w-48 rounded-md">
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
      </div>
      {isDDOpen ? (
        <BoardDropdown
          setDD={() => {
            setIsDDOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
export default Navbar;
