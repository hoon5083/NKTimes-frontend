import { HTMLAttributes, useState } from "react";
import { Author, PagedApiResponse, User } from "../../../types/api";
import { authFetcher } from "../../../utils/fetcher";
import useSWRimmutable, { KeyedMutator } from "swr";
import { getAuthHeader } from "../../../utils/auth";
import { serverAxios } from "../../../utils/commonAxios";
import { useRouter } from "next/router";

interface Props extends HTMLAttributes<HTMLDivElement> {
  author: Author;
  date: Date;
  content: string;
  commentId: number;
  mutate: any;
}

function CommentCard({ author, date, content, commentId, mutate }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useSWRimmutable<User>(`/users/me`, authFetcher).data;
  const router = useRouter();

  const deleteComment = async () => {
    const config = getAuthHeader(document.cookie);
    await serverAxios.delete(`/comments/${commentId}`, config);
    mutate();
  };

  return author ? (
    <div className="w-full p-4 px-5 mb-2 rounded-lg h-fit min-h-36 bg-cp-1 last:mb-0">
      <div className="flex flex-col justify-between w-full mb-2 sm:flex-row">
        <div className="font-bold w-fit">
          {author.authority} {author.nickname}
        </div>
        <div className="font-light text-gray-500">{date.toLocaleString()}</div>
      </div>
      <div>
        <div>{content}</div>
        {user?.id === author?.id ? (
          !isDeleting ? (
            <button
              className="px-4 py-1 text-white rounded-lg w-fit bg-cp-5 hover:shadow-xl"
              onClick={() => setIsDeleting(true)}
            >
              삭제
            </button>
          ) : (
            <button
              className="px-4 py-1 text-white rounded-lg w-fit bg-cp-4 hover:shadow-xl"
              onClick={deleteComment}
            >
              확인
            </button>
          )
        ) : null}
      </div>
    </div>
  ) : (
    <div className="w-full p-4 px-5 mb-2 rounded-lg h-fit min-h-36 bg-cp-1 last:mb-0">
      <div className="flex flex-col justify-between w-full mb-2 sm:flex-row">
        <div className="font-bold w-fit"></div>
      </div>
      <div>
        <div>삭제된 댓글입니다.</div>
      </div>
    </div>
  );
}

export default CommentCard;
