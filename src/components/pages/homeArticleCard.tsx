import { HTMLAttributes } from "react";
import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import Link from "next/link";
import { Article, PagedApiResponse } from "../../types/api";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  url: string;
  route: string;
}

function HomeArticleCard({ title, url, route }: Props) {
  const { data, mutate } = useSWR<PagedApiResponse<Article>>(
    `${url}?pageNumber=1&pageSize=6`,
    authFetcher
  );
  return (
    <div className="flex flex-col w-full h-64 mx-0 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <Link href={route}>
          <div className="flex justify-between align-bottom">
            <p className="inline-block py-1 text-lg font-bold">{title}</p>
            <p className="inline-block py-2 text-sm">더보기</p>
          </div>
        </Link>
      </div>
      <ul className="h-full px-2 list-none">
        {data?.content.map((data, index: number) => {
          return (
            <li
              key={index}
              className="flex flex-row justify-between px-1 py-1 border-b-2 border-black last:border-0"
            >
              <p>{data.title}</p>
              <p className="text-sm text-cp-5">{new Date(data.createdAt).toDateString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomeArticleCard;
