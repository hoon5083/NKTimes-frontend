import useSWR from "swr";
import useSWRimmutable from "swr";
import { fetcher } from "../../utils/fetcher";
import Link from "next/link";
import { Article, ArticleDetails, PagedApiResponse } from "../../types/api";

function HomeMainCard() {
  const articleId = useSWRimmutable<PagedApiResponse<Article>>(
    "/articles/2?pageNumber=1&pageSize=1",
    fetcher
  )?.data?.content[0].id;
  const { data, mutate } = useSWR<ArticleDetails>(
    articleId ? `/articles/2/${articleId}` : null,
    fetcher
  );
  return (
    <Link href={`/articles/2/${articleId}`}>
      <div className="flex flex-col w-full h-[60vh] sm:col-span-1 md:col-span-2 row-span-2 mx-2 mb-4 rounded-xl bg-cp-1">
        <div className="flex justify-center">
          <div className="mt-2 text-2xl font-bold">{data?.title}</div>
        </div>
        <div className="w-full h-full p-6">
          <div
            dangerouslySetInnerHTML={{
              __html: String(data?.content),
            }}
          />
        </div>
      </div>
    </Link>
  );
}

export default HomeMainCard;
