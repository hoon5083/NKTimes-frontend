import Link from "next/link";
import { HTMLAttributes } from "react";
import YouTube from "react-youtube";
import useSWR from "swr";
import useSWRimmutable from "swr";
import { Article, ArticleDetails, PagedApiResponse } from "../../types/api";
import { fetcher } from "../../utils/fetcher";

interface Props extends HTMLAttributes<HTMLDivElement> {
  order: number;
}

function HomeVideoCard({ order }: Props) {
  const articleId = useSWR<PagedApiResponse<Article>>(
    `/articles/4?pageNumber=${order}&pageSize=1`,
    fetcher
  )?.data?.content[0]?.id;
  const { data } = useSWRimmutable<ArticleDetails>(
    articleId ? `/articles/4/${articleId}` : null,
    fetcher
  );
  const videoId = data?.content.slice(3, -4);
  return (
    <div className="flex flex-col w-full h-64 mx-2 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <Link href="/articles/4">
          <div className="flex justify-between align-bottom">
            <p className="inline-block py-2 text-lg font-bold">최신 영상 {order}</p>
            <p className="inline-block py-3 text-sm">더보기</p>
          </div>
        </Link>
        <YouTube
          videoId={videoId}
          opts={{
            width: "350",
            height: "200",
            playerVars: {
              autoplay: 0,
              rel: 0,
              modestbranding: 1,
            },
          }}
        />
      </div>
    </div>
  );
}

export default HomeVideoCard;
