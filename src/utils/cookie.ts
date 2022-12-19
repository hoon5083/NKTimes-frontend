export function getCookie(cookie: string, keyName: string) {
  const value = cookie;
  const parts = value.split(`; ${keyName}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}
