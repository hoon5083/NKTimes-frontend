import { HTMLAttributes } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ArticleInput = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default ArticleInput;
