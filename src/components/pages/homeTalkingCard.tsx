import { HTMLAttributes } from "react";
import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import Link from "next/link";
import { Article, PagedApiResponse, Talking, User } from "../../types/api";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import useSWRimmutable from "swr";

function HomeTalkingCard() {
  const { loggedIn } = useGoogleAuth();
  const user = useSWRimmutable<User>(loggedIn ? "/users/me" : null, authFetcher).data;
  const { data, mutate } = useSWR<PagedApiResponse<Talking>>(
    loggedIn && user?.isApproved ? `/talkings?pageNumber=1&pageSize=6` : null,
    authFetcher
  );
  return (
    <div className="flex flex-col w-full h-64 mx-2 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        {user?.isApproved ? (
          <Link href="/talkings">
            <div className="flex justify-between align-bottom">
              <p className="inline-block py-2 text-lg font-bold">담벼락</p>
              <p className="inline-block py-3 text-sm cursor-pointer hover:font-bold">더보기</p>
            </div>
          </Link>
        ) : (
          <div className="flex justify-between align-bottom">
            <p className="inline-block py-2 text-lg font-bold">담벼락</p>
            <p className="inline-block py-3 text-sm"></p>
          </div>
        )}
      </div>
      {loggedIn ? (
        <ul className="px-2 list-none h-5/6">
          {data?.content.map((data, index: number) => {
            return (
              <li
                key={index}
                className="flex flex-row justify-between px-1 py-1 border-b-2 border-black last:border-0"
              >
                <p className="w-2/3 pr-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {data.content}
                </p>
                <p className="text-sm text-cp-5">{new Date(data.createdAt).toLocaleTimeString()}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>로그인이 필요합니다</div>
      )}
    </div>
  );
}

export default HomeTalkingCard;
