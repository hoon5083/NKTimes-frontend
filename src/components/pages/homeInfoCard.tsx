import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import Link from "next/link";
import { Article, PagedApiResponse, ArticleDetails } from "../../types/api";

function HomeInfoCard() {
  const id = useSWR<PagedApiResponse<Article>>(`/articles/1?pageNumber=1&pageSize=1`, authFetcher)
    .data?.content[0]?.id;
  const { data } = useSWR<ArticleDetails>(`/articles/1/${id}`, authFetcher);
  return (
    <Link href={`/articles/1/${id}`}>
      <div className="flex flex-col w-full h-64 col-span-1 mx-2 mb-4 cursor-pointer md:col-span-2 rounded-xl bg-cp-1 xl:col-span-3">
        <div className="w-full px-3 border-b-2 border-black h-1/6">
          <div className="flex justify-center">
            <p className="inline-block py-2 text-lg font-bold text-center">공지사항</p>
          </div>
          <div className="flex flex-col">
            <div className="self-center font-bold">{data?.title}</div>
            <div className="inline-block py-3 text-sm">
              <div
                dangerouslySetInnerHTML={{
                  __html: String(data?.content),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HomeInfoCard;
