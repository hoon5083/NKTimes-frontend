import axios, { AxiosError } from "axios";

// Server side rendering에서 backend에 요청을 보내는 axios
// (getServersideProps, getStaticProps 등에서 사용)
export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
});

interface ErrorInfo {
  title: string;
  statusCode: number;
}

export function getServerAxiosErrorInfo(error: unknown) {
  const errorInfo: ErrorInfo = { title: "에러가 발생했습니다. ", statusCode: 500 };

  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError;
    if (serverError && serverError.response) {
      errorInfo.statusCode = serverError.response.status;
    }
  }

  return errorInfo;
}
