import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FormEvent, HTMLAttributes, useCallback, useState } from "react";
import useGoogleAuth from "../../../hooks/useGoogleAuth";
import { ArticleDetails } from "../../../types/api";
import { getAuthHeader } from "../../../utils/auth";
import { serverAxios } from "../../../utils/commonAxios";
const Editor = dynamic(() => import("../../../components/pages/articles/editor"), {
  ssr: false,
});

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
  setIsModyfing: React.Dispatch<React.SetStateAction<boolean>>;
}

function ArticleModifySection({ title, content, setIsModyfing }: Props) {
  const { loggedIn } = useGoogleAuth();
  const router = useRouter();
  const [htmlStr, setHtmlStr] = React.useState<string>(content);

  const handleArticle = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      async function submitGroup() {
        const form = e.currentTarget;
        const formElements = form
          ? (form.elements as typeof form.elements & {
              title: HTMLInputElement;
            })
          : null;
        if (htmlStr === "") {
          alert("빈 글 입니다.");
          return;
        }
        if (loggedIn === false) {
          alert("로그인이 필요합니다.");
          router.replace("/");
          return;
        }
        const config = getAuthHeader(document.cookie);
        try {
          const body = {
            content: htmlStr,
            title: formElements?.title.value,
          };
          const res = await serverAxios.patch(
            `/articles/${router.query.id}/${router.query.articleId}`,
            body,
            config
          );
          router.replace(`/articles/${router.query.id}/${router.query.articleId}`);
        } catch (e) {
          console.log(e);
        }
      }
      setIsModyfing(false);
      router.replace(`/articles/${router.query.id}`);
      submitGroup();
    },
    [loggedIn, router, htmlStr, setIsModyfing]
  );
  return (
    <div>
      <div className="text-lg">제목:</div>
      <form onSubmit={handleArticle}>
        <input className="w-full h-10 p-2 mb-2 rounded-lg" id="title" defaultValue={title} />
        <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        <button className="px-2 py-1 mt-20 rounded-lg w-fit bg-cp-4 hover:shadow-xl" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}

export default ArticleModifySection;
