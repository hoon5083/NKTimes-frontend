import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import Link from "next/link";
import { Article, ArticleDetails, PagedApiResponse } from "../../types/api";

function HomeInfoCard() {
  const id = useSWR<PagedApiResponse<Article>>(`/articles/1?pageNumber=1&pageSize=1`, authFetcher)
    .data?.content[0]?.id;
  const { data } = useSWR<ArticleDetails>(`/articles/1/${id}`, authFetcher);
  return (
    <Link href={`/articles/1/${id}`}>
      <div
        className="flex flex-col w-full h-40 col-span-1 p-2 mx-2 mb-4 cursor-pointer md:col-span-2 rounded-xl bg-cp-1">
        <div className="flex flex-col overflow-auto">
          <div className="self-center font-bold">{data?.title}</div>
          <div className="py-3 text-sm">
            <div
              dangerouslySetInnerHTML={{
                __html: String(data?.content),
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HomeInfoCard;
