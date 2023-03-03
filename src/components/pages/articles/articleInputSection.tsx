import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useState } from "react";
import useGoogleAuth from "../../../hooks/useGoogleAuth";
import { getAuthHeader } from "../../../utils/auth";
import { serverAxios } from "../../../utils/commonAxios";

const Editor = dynamic(() => import("../../../components/pages/articles/editor"), {
  ssr: false,
});

function ArticleInputSection() {
  const { loggedIn } = useGoogleAuth();
  const router = useRouter();
  const [htmlStr, setHtmlStr] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

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
          const res = await serverAxios.post(`/articles/${router.query.id}`, body, config);
          router.replace(`/articles/${router.query.id}/${res.data.id}`);
        } catch (e) {
          console.log(e);
        }
      }

      submitGroup();
    },
    [loggedIn, router, htmlStr, files],
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
      <form onSubmit={handleArticle} className="flex flex-col gap-2">
        <input className="w-full h-10 p-2 rounded-lg" id="title" />
        <div className="text-sm font-light text-gray">
          100mb이하의 png, jpg, jpeg, bmp 이미지만 삽입 가능합니다.
        </div>
        <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        <div className="text-sm font-light text-gray">
          100mb이하의 pdf, doc, docx 파일만 첨부 가능합니다.
        </div>
        <input type="file" id="file" onChange={handleChange} />
        <div className="bg-cp-1 w-full h-fit rounded-lg flex flex-col justify-start">{files.map((file) => (
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

export default ArticleInputSection;
