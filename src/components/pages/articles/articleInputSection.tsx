import { useRouter } from "next/router";
import React, { FormEvent, HTMLAttributes, useCallback, useState } from "react";
import useGoogleAuth from "../../../hooks/useGoogleAuth";
import { ArticleDetails } from "../../../types/api";
import { getAuthHeader } from "../../../utils/auth";
import { serverAxios } from "../../../utils/commonAxios";
import ArticleInput from "./articleInput";

function ArticleInputSection() {
  const { loggedIn } = useGoogleAuth();
  const [content, setContent] = useState("");
  const router = useRouter();
  const modules = {
    toolbar: {
      // container에 등록되는 순서대로 tool 배치
      container: [
        [{ font: [] }], // font 설정
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
        ["bold", "italic", "underline", "strike", "blockquote", "code-block", "formula"], // 굵기, 기울기, 밑줄 등 부가 tool 설정
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], // 리스트, 인덴트 설정
        ["link", "image", "video"], // 링크, 이미지, 비디오 업로드 설정
        [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
        ["clean"], // toolbar 설정 초기화 설정
      ],
    },
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "formula",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

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
        if (content === "") {
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
            content: content,
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
    [loggedIn, content, router]
  );
  return (
    <div>
      <div className="text-lg">제목:</div>
      <form onSubmit={handleArticle}>
        <input className="w-full h-10 p-2 rounded-lg" id="title" />
        <div className="py-2"></div>
        <ArticleInput
          theme="snow"
          modules={modules}
          formats={formats}
          className="h-[60vh] mb-20"
          onChange={setContent}
        />
        <button className="w-1/12 h-10 rounded-lg bg-cp-4 hover:shadow-xl" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}

export default ArticleInputSection;
