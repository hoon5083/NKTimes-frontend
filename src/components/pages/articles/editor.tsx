import * as React from "react";
import axios from "axios";
import { NextPage } from "next";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RangeStatic } from "quill";
import { serverAxios } from "../../../utils/commonAxios";
import { getAuthHeader } from "../../../utils/auth";

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: NextPage<IEditor> = ({ htmlStr, setHtmlStr }) => {
  const quillRef = React.useRef<ReactQuill>(null);

  // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용
  const imageHandler = () => {
    // file input 임의 생성
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = async () => {
      const file = input.files;
      const formData = new FormData();
      const config = getAuthHeader(document.cookie);

      if (file) {
        formData.append("file", file[0]);
      }

      // file 데이터 담아서 서버에 전달하여 이미지 업로드
      const res = await serverAxios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT}/files`,
        formData,
        config
      );

      if (quillRef.current) {
        // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
        const index = (quillRef.current.getEditor().getSelection() as RangeStatic).index;
        const url = process.env.NEXT_PUBLIC_ENDPOINT + "/files/" + res.data.key;
        const quillEditor = quillRef.current.getEditor();
        quillEditor.setSelection(index, 1);
        quillEditor?.clipboard.dangerouslyPasteHTML(index, `<img src=${url} alt=${"alt text"} />`);
      }
    };
  };

  // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
  const modules = React.useMemo(
    () => ({
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: [
          [{ font: [] }], // font 설정
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          ["bold", "italic", "underline", "strike"], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [], // 리스트, 인덴트 설정
          ["image"], // 링크, 이미지, 비디오 업로드 설정
          [], // 정렬, 글씨 색깔, 글씨 배경색 설정
          ["clean"], // toolbar 설정 초기화 설정
        ],

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    []
  );

  // toolbar에 사용되는 tool format
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

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      formats={formats}
      value={htmlStr}
      placeholder="내용을 입력하세요."
      onChange={(content: any, delta: any, source: any, editor: any) =>
        setHtmlStr(editor.getHTML())
      }
      className="h-72"
    />
  );
};

export default Editor;
