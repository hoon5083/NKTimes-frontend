import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { Article, User } from "../../../types/api";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { authFetcher } from "../../../utils/fetcher";
import useSWRimmutable from "swr";
import useGoogleAuth from "../../../hooks/useGoogleAuth";

interface Props extends HTMLAttributes<HTMLDivElement> {
  article: Article;
  boardId: number;
}

function ArticleBrief({ article, boardId }: Props) {
  const { loggedIn } = useGoogleAuth();
  const user = useSWRimmutable<User>(loggedIn ? "/users/me" : null, authFetcher).data;
  const url = "/articles/" + String(boardId) + "/" + String(article.id);
  const condition = user?.isApproved || boardId <= 4;
  return condition ? (
    <Link href={url}>
      <div className="w-11/12 h-32 p-4 mx-auto my-2 rounded-lg cursor-pointer bg-cp-1 hover:shadow-xl">
        <div className="flex justify-between">
          <div className="text-xl font-bold">{article.title}</div>
          <div className="flex justify-between">
            <div className="mr-4">{article.author.authority}</div>
            <div>{article.author.nickname}</div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div className="flex justify-between">
            <FontAwesomeIcon icon={faHeart} className="mt-1" />
            <div className="mx-4">{article.likeCount}</div>
          </div>
          <div>{new Date(article.updatedAt).toLocaleDateString()}</div>
        </div>
      </div>
    </Link>
  ) : (
    <div className="w-11/12 h-32 p-4 mx-auto my-2 rounded-lg bg-cp-1">
      <div className="flex justify-between">
        <div className="text-xl font-bold">{article.title}</div>
        <div className="flex justify-between">
          <div className="mr-4">{article.author.authority}</div>
          <div>{article.author.nickname}</div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <div className="flex justify-between">
          <FontAwesomeIcon icon={faHeart} className="mt-1" />
          <div className="mx-4">{article.likeCount}</div>
        </div>
        <div>{new Date(article.updatedAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}

export default ArticleBrief;
