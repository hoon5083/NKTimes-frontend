import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import CommentSection from "../../../components/pages/articles/commentSection";
import { ArticleDetails } from "../../../types/api";
import { authFetcher } from "../../../utils/fetcher";

const ArticleDetail: NextPage = () => {
  const router = useRouter();
  const { id, articleId } = router.query;
  const { data } = useSWR<ArticleDetails>(`/articles/${id}/${articleId}`, authFetcher);

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mb-20">
        <div className="mx-auto my-10 text-4xl font-bold w-fit">{data?.title}</div>
        <div className="flex mx-4 my-8">
          <div className="flex justify-between w-full my-4">
            <div>{data ? new Date(data.updatedAt).toLocaleString() : null}</div>
            <div className="flex justify-end w-1/3">
              <div className="flex justify-between w-1/2 ml-2">
                <div>{data?.author.authority}</div>
                <div>{data?.author.nickname}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: String(data?.content || "loading") }}
          className="mx-4"
        />
      </div>
      <button className="flex justify-end">
        <FontAwesomeIcon icon={faHeart} className="mt-1" />
        <div className="flex justify-end px-2 mb-2">{data?.likeCount}</div>
      </button>

      <CommentSection articleId={Number(articleId)} />
    </div>
  );
};

export default ArticleDetail;
