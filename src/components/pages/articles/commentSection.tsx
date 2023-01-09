import { HTMLAttributes, useState } from "react";
import { Comment, PagedApiResponse } from "../../../types/api";
import CommentInput from "./commentInput";
import useSWR from "swr";
import { authFetcher } from "../../../utils/fetcher";
import CommentCard from "./commentCard";
import useGoogleAuth from "../../../hooks/useGoogleAuth";

interface Props extends HTMLAttributes<HTMLDivElement> {
  articleId: number;
}

function CommentSection({ articleId }: Props) {
  const [pageIndex, setPageIndex] = useState(1);
  const { loggedIn } = useGoogleAuth();
  const { data, mutate } = useSWR<PagedApiResponse<Comment>>(
    loggedIn ? `/comments?pageSize=20&pageNumber=${pageIndex}&articleId=${articleId}` : null,
    authFetcher
  );

  return (
    <div className="w-full p-4 mx-auto h-fit">
      {loggedIn ? <CommentInput articleId={articleId} mutate={mutate} /> : null}
      {loggedIn
        ? data?.content.map((comment, index: number) => {
            return (
              <CommentCard
                key={index}
                commentId={comment.id}
                author={comment.author}
                date={new Date(comment.createdAt)}
                content={comment.content}
                mutate={mutate}
              />
            );
          })
        : null}
      <div className="flex justify-center gap-6">
        {pageIndex > 1 ? <div onClick={() => setPageIndex(pageIndex - 1)}>Previous</div> : null}
        {pageIndex < (data?.totalPages as number) ? (
          <div onClick={() => setPageIndex(pageIndex + 1)}>Next</div>
        ) : null}
      </div>
    </div>
  );
}

export default CommentSection;
