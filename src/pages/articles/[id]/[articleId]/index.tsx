import { faHeart as voidHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import useSWRimmutable from "swr";
import CommentSection from "../../../../components/pages/articles/commentSection";
import useGoogleAuth from "../../../../hooks/useGoogleAuth";
import { ArticleDetails, User } from "../../../../types/api";
import { getAuthHeader } from "../../../../utils/auth";
import { serverAxios } from "../../../../utils/commonAxios";
import { authFetcher } from "../../../../utils/fetcher";

const ArticleDetail: NextPage = () => {
  const router = useRouter();
  const { id, articleId } = router.query;
  const user = useSWRimmutable<User>(`/users/me`, authFetcher).data;
  const { data, mutate } = useSWR<ArticleDetails>(`/articles/${id}/${articleId}`, authFetcher);
  const { loggedIn } = useGoogleAuth();

  const createLike = async () => {
    const config = getAuthHeader(document.cookie);
    await serverAxios.post(`/articles/${id}/${articleId}/like`, {}, config);
    mutate();
  };

  const deleteLike = async () => {
    const config = getAuthHeader(document.cookie);
    await serverAxios.delete(`/articles/${id}/${articleId}/like`, config);
    mutate();
  };

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mb-20">
        <div className="mx-auto my-10 text-4xl font-bold w-fit">{data?.title}</div>
        <div className="flex mx-4 my-8">
          <div className="flex justify-between w-full my-4">
            <div>{data ? new Date(data.updatedAt).toLocaleString() : null}</div>
            <div className="flex justify-end w-1/3">
              <div className="flex justify-between gap-2 ml-2 w-fit">
                <div className="w-fit">{data?.author.authority}</div>
                <div className="w-fit">{data?.author.nickname}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: String(data?.content || "loading") }}
          className="mx-4"
        />
      </div>
      <div className="flex justify-between w-11/12 mx-auto justify-self-center">
        {/* {user?.id === data?.author.id ? (
          <Link href={`${router.asPath}/edit`}>
            <button className="w-1/12 h-8 text-sm rounded-lg bg-cp-4">수정하기</button>
          </Link>
        ) : ( */}
        <div></div>
        {/* )} */}
        {loggedIn ? (
          !data?.isLiked ? (
            <button onClick={createLike} className="flex justify-center">
              <FontAwesomeIcon icon={voidHeart} className="mt-1" />
              <div className="px-2 mb-2">{data?.likeCount}</div>
            </button>
          ) : (
            <button onClick={deleteLike} className="flex justify-center">
              <FontAwesomeIcon icon={fullHeart} className="mt-1" />
              <div className="px-2 mb-2">{data?.likeCount}</div>
            </button>
          )
        ) : (
          <div className="flex justify-center">
            <FontAwesomeIcon icon={fullHeart} className="mt-1" />
            <div className="px-2 mb-2">{data?.likeCount}</div>
          </div>
        )}
      </div>
      <CommentSection articleId={Number(articleId)} />
    </div>
  );
};

export default ArticleDetail;
