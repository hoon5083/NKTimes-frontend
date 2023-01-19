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
import Image from "next/image";

function Navbar() {
  const router = useRouter();
  const { logout, loggedIn } = useGoogleAuth();
  const [isLBOpen, setIsLBOpen] = useState(false);
  const [isDDOpen, setIsDDOpen] = useState(false);
  const { data } = useSWR<User>(loggedIn ? "/users/me" : null, authFetcher);

  return (
    <>
      <div className="flex justify-between h-12 mb-5 bg-cp-1">
        <div className="flex">
          <Link href="/">
            <p className="px-2 m-2 text-2xl cursor-pointer">
              <Image src="/images/nklogo.png" width="40px" height="20px" alt="nklogo"></Image>Times
            </p>
          </Link>{" "}
          <Link href="/boards">
            <button className="hover:text-cp-4">
              <FontAwesomeIcon icon={faList} />
            </button>
          </Link>
        </div>
        <div className="flex flex-row justify-between w-1/2 py-3">
          <Link href="/articles/10">
            <div className="cursor-pointer hover:font-bold">신문반</div>
          </Link>
          <Link href="/articles/11">
            <div className="cursor-pointer hover:font-bold">방송반</div>
          </Link>
          <Link href="/articles/12">
            <div className="cursor-pointer hover:font-bold">학생회</div>
          </Link>
          <Link href="/articles/8">
            <div className="cursor-pointer hover:font-bold">후배사랑장학회</div>
          </Link>
        </div>
        <div className="flex">
          {data?.isApproved ? (
            <Link href="/boards/apply">
              <FontAwesomeIcon
                icon={faPlus}
                className="z-50 p-3 my-1 bg-transparent rounded-lg w-fit hover:text-cp-4"
              />
            </Link>
          ) : null}
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
