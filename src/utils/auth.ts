import { AUTH_TOKEN_COOKIE_KEY } from "../constants/auth";
import { getCookie } from "./cookie";

// client 의 req 를 인자로 받아서, 그 안의 cookie 값 조사하여, config 에
// Authorization 값을 싣거나, 싣지 않은 Header 반환
export function getAuthHeader(cookie: string | undefined) {
  const authToken = cookie ? getCookie(cookie, AUTH_TOKEN_COOKIE_KEY) : undefined;

  // request header 정보
  const config = authToken
    ? {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    : {};

  return config;
}
