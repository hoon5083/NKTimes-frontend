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

function ArticleInputSection() {
  const { loggedIn } = useGoogleAuth();
  const router = useRouter();
  const [htmlStr, setHtmlStr] = React.useState<string>("");

  const handleArticle = useCallback(
    (e: any) => {
      e.preventDefault();
      async function submitGroup() {
        const form = e.currentTarget;
        const formElements = form
          ? (form.elements as typeof form.elements & {
              title: HTMLInputElement;
              file: HTMLInputElement;
            })
          : null;
        console.log(formElements.files);
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
          const res = await serverAxios.post(`/articles/${router.query.id}`, body, config);
          router.replace(`/articles/${router.query.id}/${res.data.id}`);
        } catch (e) {
          console.log(e);
        }
      }
      submitGroup();
    },
    [loggedIn, router, htmlStr]
  );
  return (
    <div>
      <div className="text-lg">제목:</div>
      <form onSubmit={handleArticle} className="flex flex-col gap-2">
        <input className="w-full h-10 p-2 rounded-lg" id="title" />
        <div className="text-sm font-light text-gray">
          100mb이하의 png, jpg, jpeg, bmp 이미지만 삽입 가능합니다.
        </div>
        <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        <div className="text-sm font-light text-gray">
          100mb이하의 pdf, doc, docx 파일만 첨부 가능합니다.
        </div>
        <input type="file" id="file" />
        <button
          className="px-2 py-1 text-white rounded-lg w-fit bg-cp-5 hover:shadow-xl"
          type="submit"
        >
          저장
        </button>
      </form>
    </div>
  );
}

export default ArticleInputSection;
