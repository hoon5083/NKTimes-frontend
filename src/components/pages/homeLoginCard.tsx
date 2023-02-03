import { useRouter } from "next/router";
import { useState } from "react";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import { User } from "../../types/api";
import { authFetcher } from "../../utils/fetcher";
import useSWR from "swr";
import Link from "next/link";

function HomeLoginCard() {
  const router = useRouter();
  const { logout, loggedIn } = useGoogleAuth();
  const { data } = useSWR<User>(loggedIn ? "/users/me" : null, authFetcher);
  return (
    <div className="flex flex-col justify-center w-full h-64 p-4 mx-2 mb-4 rounded-xl bg-cp-1">
      <div className="flex flex-col justify-center align-middle">
        {data ? (
          <div id="auth_element_user-login-trigger">
            <Link href="/users/mypage">
              <div className="flex justify-center gap-2 cursor-pointer hover:font-bold">
                <div>{data?.authority}</div>
                <div>{data?.nickname}</div>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            {loggedIn ? (
              <button
                className="p-0 border-none outline-none"
                onClick={() => {
                  logout();
                  router.replace("/");
                }}
              >
                <div className="cursor-pointer hover:font-bold">로그아웃</div>
              </button>
            ) : (
              <div className="text-center">Guest</div>
            )}
          </div>
        )}
        <div className="flex justify-center mt-5">
          {loggedIn && data ? (
            <div onClick={logout} className="text-center cursor-pointer hover:font-bold">
              로그아웃
            </div>
          ) : (
            <div id="auth_element_user-login-google"></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default HomeLoginCard;
