import type { NextPage } from "next";
import TalkingCard from "../components/pages/talkings/talkingCard";
import { authFetcher } from "../utils/fetcher";
import useSWR from "swr";
import { PagedApiResponse, Talking } from "../types/api";
import { useState } from "react";
import TalkingInput from "../components/pages/talkings/talkingInput";

const Talkings: NextPage = () => {
  const [pageCount, setPageCount] = useState(1);
  const { data, mutate } = useSWR<PagedApiResponse<Talking>>(
    `/talkings?pageNumber=1&pageSize=${pageCount * 20}`,
    authFetcher
  );
  return (
    <div className="flex flex-col w-11/12 h-screen mx-auto justify-s">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">담벼락</div>
      <TalkingInput />
      {data?.content.map((talking, index: number) => {
        const dateString =
          talking.updatedAt === talking.createdAt
            ? new Date(talking.createdAt).toLocaleString()
            : new Date(talking.updatedAt).toLocaleString() + " (수정됨)";
        return (
          <TalkingCard
            key={index}
            authority={talking.author.authority}
            dateString={dateString}
            content={talking.content}
            nickname={talking.author.nickname}
          />
        );
      })}
      {pageCount * 20 <= Number(data?.totalCount) ? (
        <div className="" onClick={() => setPageCount(pageCount + 1)}>
          더보기
        </div>
      ) : null}
    </div>
  );
};

export default Talkings;