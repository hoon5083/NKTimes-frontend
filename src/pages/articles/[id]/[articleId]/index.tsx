import { faHeart as voidHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWRimmutable from "swr";
import useSWR from "swr";
import YouTube from "react-youtube";
import { ArticleDetails, User } from "../../../../types/api";
import useGoogleAuth from "../../../../hooks/useGoogleAuth";
import { getAuthHeader } from "../../../../utils/auth";
import { serverAxios } from "../../../../utils/commonAxios";
import CommentSection from "../../../../components/pages/articles/commentSection";
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

  const videoId = data?.content.slice(3, -4);

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mb-20">
        <div className="mx-auto my-10 text-4xl font-bold w-fit">{data?.title}</div>
        <div className="flex mx-4 my-8">
          <div className="flex justify-between w-full my-4">
            <div className="font-light text-gray-500">
              {data ? new Date(data.updatedAt).toLocaleString() : null}
            </div>
            <div className="flex justify-end w-1/3">
              <div className="flex justify-between gap-2 ml-2 w-fit">
                <div className="font-bold w-fit">{data?.author.authority}</div>
                <div className="w-fit">{data?.author.nickname}</div>
              </div>
            </div>
          </div>
        </div>

        {Number(router.query.id) !== 4 ? (
          <div
            dangerouslySetInnerHTML={{ __html: String(data?.content || "loading") }}
            className="mx-4"
          />
        ) : (
          <YouTube
            videoId={videoId}
            opts={{
              width: "560",
              height: "315",
              playerVars: {
                autoplay: 0,
                rel: 0,
                modestbranding: 1,
              },
            }}
          />
        )}
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
