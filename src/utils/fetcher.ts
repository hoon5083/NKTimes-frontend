import { getAuthHeader } from "./auth";
import { serverAxios } from "./commonAxios";

export async function fetcher(url: string) {
  return (await serverAxios.get(url)).data;
}

export async function authFetcher(url: string) {
  const config = getAuthHeader(document.cookie);
  return (await serverAxios.get(`${process.env.NEXT_PUBLIC_ENDPOINT}${url}`, config)).data;
}
