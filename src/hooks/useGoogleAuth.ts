import { getCookie, deleteCookie } from "cookies-next";
import decodeToken from "jwt-decode";
import { useCallback, useEffect, useState } from "react";

interface AuthCookie {
  platform: string;
  token: string;
}

interface AuthTokenData {
  name: string;
  email: string;
  picture: string;
  exp: string;
}

const AUTH_COOKIE: AuthCookie = {
  platform: "auth_platform",
  token: "auth_token",
};

function useGoogleAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    Object.entries(AUTH_COOKIE).map(([_, value]) => {
      deleteCookie(value);
    });
    window.location.reload();
  }, []);

  useEffect(() => {
    const authPlatform = getCookie(AUTH_COOKIE.platform)?.toString();
    const authToken = getCookie(AUTH_COOKIE.token)?.toString();

    if (authPlatform && authToken) {
      try {
        const decodedToken = decodeToken<AuthTokenData>(authToken);

        if (Number(new Date(Number(decodedToken.exp) * 1000)) > Number(new Date())) {
          switch (authPlatform) {
            case "google":
              setLoggedIn(true);
              break;

            default:
              setLoggedIn(false);
              setError(true);
              setErrorMessage("unknown_platform");
              logout();
          }
        } else {
          setLoggedIn(false);
          setError(true);
          setErrorMessage("expired_token");
          logout();
        }
      } catch (e) {
        setLoggedIn(false);
        setError(true);
        setErrorMessage("invalid_jwt");
      }
    } else {
      setError(true);
      setErrorMessage("undefined_authcookie");
    }
    setLoading(false);
  }, [logout]);

  return { loggedIn, error, errorMessage, logout, loading };
}

export default useGoogleAuth;
