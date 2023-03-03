import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, HTMLAttributes, useCallback, useState } from "react";
import useGoogleAuth from "../../../hooks/useGoogleAuth";
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
  const [files, setFiles] = useState<File[]>([]);


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
        if (!loggedIn) {
          alert("로그인이 필요합니다.");
          router.replace("/");
          return;
        }
        const config = getAuthHeader(document.cookie);
        const fileKeys = await Promise.all(files.map(async (file) => {
          const formData = new FormData();
          if (file) {
            formData.append("file", file);
          }
          const res = await serverAxios.post("/files", formData, config);
          return res.data.key;
        }));
        try {
          const body = {
            content: htmlStr,
            title: formElements?.title.value,
            fileKeys: fileKeys,
          };
          await serverAxios.patch(
            `/articles/${router.query.id}/${router.query.articleId}`,
            body,
            config,
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
    [loggedIn, router, htmlStr, setIsModyfing, files],
  );

  const addFile = (newFile: File) => {
    const newList = [...files];
    const filtered = newList.filter((file) => file.name !== newFile.name);
    filtered.push(newFile);
    setFiles(filtered);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e?.target?.files && e?.target?.files[0];
    if (newFile) {
      addFile(newFile);
    }
  };

  const deleteFile = (targetFileName: string) => {
    const newList = [...files];
    setFiles(newList.filter((file) => file.name !== targetFileName));
  };

  return (
    <div>
      <div className="text-lg">제목:</div>
      <form onSubmit={handleArticle}>
        <input className="w-full h-10 p-2 mb-2 rounded-lg" id="title" defaultValue={title} />
        <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        <input type="file" id="file" onChange={handleChange} />
        <div className="bg-cp-1 w-full h-fit rounded-lg flex flex-col justify-start mb-2">
          {files.map((file) => (
            <div key={file.name} className="w-fit hover:font-bold hover:cursor-pointer" onClick={() => {
              deleteFile(file.name);
            }}>x {file.name}</div>))}</div>
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

export default ArticleModifySection;
