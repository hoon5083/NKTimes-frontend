import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { Article } from "../../../types/api";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Props extends HTMLAttributes<HTMLDivElement> {
  article: Article;
}

function ArticleBrief({ article }: Props) {
  const url = "/articles/" + String(article.id);
  return (
    <Link href={url}>
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
    </Link>
  );
}

export default ArticleBrief;
