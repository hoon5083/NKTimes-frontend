import { FormEvent, HTMLAttributes, useCallback } from "react";
import { getAuthHeader } from "../../../utils/auth";
import { serverAxios } from "../../../utils/commonAxios";
import useSWR from "swr";
import { PagedApiResponse, Talking } from "../../../types/api";
import useGoogleAuth from "../../../hooks/useGoogleAuth";
import { authFetcher } from "../../../utils/fetcher";

function TalkingInput() {
  const { loggedIn } = useGoogleAuth();
  const { mutate } = useSWR<PagedApiResponse<Talking>>(
    loggedIn ? `/talkings?pageNumber=1&pageSize=6` : null,
    authFetcher
  );
  const handleTalking = useCallback((e: FormEvent<HTMLFormElement>) => {
    async function submitGroup() {
      const form = e.currentTarget;
      const formElements = form
        ? (form.elements as typeof form.elements & {
            content: HTMLInputElement;
          })
        : null;
      if (formElements?.content.value.length == 0) {
        alert("빈 글 입니다");
        return;
      }

      const config = getAuthHeader(document.cookie);
      try {
        const body = {
          content: formElements?.content.value,
        };
        await serverAxios.post(`/talkings`, body, config);
      } catch (e) {
        console.log(e);
      }
      mutate();
    }
    submitGroup();
  }, []);
  return (
    <form className="flex w-full mb-5" onSubmit={handleTalking}>
      <input
        className="w-5/6 h-20 p-2 mr-3 rounded-lg"
        placeholder="20자 이내로 남겨주세요"
        name="content"
      />
      <button className="w-1/6 h-20 rounded-lg bg-cp-4" type="submit">
        글쓰기
      </button>
    </form>
  );
}

export default TalkingInput;
