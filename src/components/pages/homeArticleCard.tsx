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
    <div className="flex flex-col w-full h-64 mx-2 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <Link href={route}>
          <div className="flex justify-between align-bottom">
            <p className="inline-block py-2 text-lg font-bold">{title}</p>
            <p className="inline-block py-3 text-sm cursor-pointer hover:font-bold">더보기</p>
          </div>
        </Link>
      </div>
      <ul className="px-2 list-none h-5/6">
        {data?.content.map((data, index: number) => {
          return (
            <li
              key={index}
              className="flex flex-row justify-between px-1 py-1 border-b-2 border-black last:border-0"
            >
              <p className="w-2/3 pr-2 overflow-hidden">{data.title}</p>
              <p className="text-sm text-cp-5">{new Date(data.createdAt).toLocaleDateString()}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomeArticleCard;
