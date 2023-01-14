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

function HomeMainArticleCard({ title, url, route }: Props) {
  const { data, mutate } = useSWR<PagedApiResponse<Article>>(
    `${url}?pageNumber=1&pageSize=10`,
    authFetcher
  );
  const firstArticle = data?.content[0];
  return (
    <div className="flex flex-col w-full col-span-1 mx-2 mb-4 2xl:row-span-2 rounded-xl bg-cp-1 md:col-span-2 2xl:col-span-1">
      <Link href={route + "/" + firstArticle?.id}>
        <div className="flex flex-row justify-center px-1 py-1 border-b-2 border-black cursor-pointer last:border-0 hover:font-bold">
          <p className="justify-center pr-2 overflow-hidden text-xl font-semibold text-ellipsis whitespace-nowrap">
            {firstArticle?.title}
          </p>
        </div>
      </Link>
      <ul className="px-2 list-none h-5/6">
        {data?.content.map((data, index: number) => {
          return index ? (
            <Link href={route + "/" + data.id} key={index}>
              <li className="flex flex-row justify-between px-1 py-1 border-b-2 border-black cursor-pointer last:border-0 hover:font-bold">
                <p className="w-2/3 pr-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {data.title}
                </p>
                <p className="text-sm text-cp-5">{new Date(data.createdAt).toLocaleDateString()}</p>
              </li>
            </Link>
          ) : null;
        })}
      </ul>
      <Link href={route}>
        <div className="flex justify-center">
          <p className="inline-block py-3 text-sm cursor-pointer hover:font-bold">더보기</p>
        </div>
      </Link>
    </div>
  );
}

export default HomeMainArticleCard;