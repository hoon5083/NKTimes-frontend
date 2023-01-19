import { FormEvent, HTMLAttributes, useCallback } from "react";
import { getAuthHeader } from "../../../utils/auth";
import { serverAxios } from "../../../utils/commonAxios";
import { KeyedMutator } from "swr";
import { Comment, PagedApiResponse, Talking } from "../../../types/api";
import useGoogleAuth from "../../../hooks/useGoogleAuth";

interface Props extends HTMLAttributes<HTMLDivElement> {
  mutate: KeyedMutator<PagedApiResponse<Comment>>;
  articleId: number;
}

function CommentInput({ mutate, articleId }: Props) {
  const handleComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      async function submitGroup() {
        const form = e.currentTarget;
        const formElements = form
          ? (form.elements as typeof form.elements & {
              content: HTMLInputElement;
            })
          : null;
        if (formElements?.content.value.length == 0) {
          alert("빈 댓글 입니다");
          return;
        }

        const config = getAuthHeader(document.cookie);
        try {
          const body = {
            content: formElements?.content.value,
          };
          await serverAxios.post(`/comments?articleId=${articleId}`, body, config);
        } catch (e) {
          console.log(e);
        }
        mutate();
      }
      submitGroup();
    },
    [mutate, articleId]
  );
  return (
    <form className="flex w-full mb-5" onSubmit={handleComment}>
      <input
        className="w-5/6 h-20 p-2 mr-3 rounded-lg"
        placeholder="댓글을 남겨주세요"
        name="content"
      />
      <button className="w-1/6 h-20 text-white rounded-lg bg-cp-5" type="submit">
        글쓰기
      </button>
    </form>
  );
}

export default CommentInput;
