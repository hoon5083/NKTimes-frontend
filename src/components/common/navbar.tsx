import { useState } from "react";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import { User } from "../../types/api";

function Navbar() {
  const { logout, loggedIn } = useGoogleAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSWR<User>("/users/me", authFetcher);

  return (
    <div className="flex justify-between w-full h-12 mb-5 bg-cp-4">
      <p>NKTimes</p>
      <div>
        <button
          className="p-0 border-none outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          id="auth_element_user-login-trigger"
        >
          <div className="w-20 h-10 bg-teal-400">{loggedIn ? data?.nickname : "Guest"}</div>
        </button>
        {isOpen && (
          <>
            {loggedIn ? (
              <div onClick={logout}>로그아웃</div>
            ) : (
              <div id="auth_element_user-login-google">a</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default Navbar;
