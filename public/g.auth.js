/*! js-cookie v3.0.1 | MIT */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self),
      (function () {
        var n = e.Cookies,
          o = (e.Cookies = t());
        o.noConflict = function () {
          return (e.Cookies = n), o;
        };
      })());
})(this, function () {
  "use strict";
  function e(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) e[o] = n[o];
    }
    return e;
  }
  return (function t(n, o) {
    function r(t, r, i) {
      if ("undefined" != typeof document) {
        "number" == typeof (i = e({}, o, i)).expires &&
          (i.expires = new Date(Date.now() + 864e5 * i.expires)),
          i.expires && (i.expires = i.expires.toUTCString()),
          (t = encodeURIComponent(t)
            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
            .replace(/[()]/g, escape));
        var c = "";
        for (var u in i) i[u] && ((c += "; " + u), !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
        return (document.cookie = t + "=" + n.write(r, t) + c);
      }
    }
    return Object.create(
      {
        set: r,
        get: function (e) {
          if ("undefined" != typeof document && (!arguments.length || e)) {
            for (
              var t = document.cookie ? document.cookie.split("; ") : [], o = {}, r = 0;
              r < t.length;
              r++
            ) {
              var i = t[r].split("="),
                c = i.slice(1).join("=");
              try {
                var u = decodeURIComponent(i[0]);
                if (((o[u] = n.read(c, u)), e === u)) break;
              } catch (e) {}
            }
            return e ? o[e] : o;
          }
        },
        remove: function (t, n) {
          r(t, "", e({}, n, { expires: -1 }));
        },
        withAttributes: function (n) {
          return t(this.converter, e({}, this.attributes, n));
        },
        withConverter: function (n) {
          return t(e({}, this.converter, n), this.attributes);
        },
      },
      { attributes: { value: Object.freeze(o) }, converter: { value: Object.freeze(n) } }
    );
  })(
    {
      read: function (e) {
        return (
          '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
        );
      },
      write: function (e) {
        return encodeURIComponent(e).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        );
      },
    },
    { path: "/" }
  );
});

const BACKEND_DOMAIN = "http://localhost:8000";

const WebApp = new (function () {
  const userAuth = {
    google: {
      credential: false,
      userInfo: {
        name: false,
        email: false,
      },
    },
  };

  this.CONFIG = new (function () {
    this.api = {
      google: {
        client_id: "215726082307-i3ueutoogebcctkicvd9ma1t0cigmect.apps.googleusercontent.com",
      },
    };
  })();

  this.HANDLER = new (function () {
    this.parseJWT = function (TOKEN) {
      let base64Url = TOKEN.split(".")[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    };

    this.googleAuth = new (function () {
      this.INITIATE = function () {
        google.accounts.id.initialize({
          client_id: WebApp.CONFIG.api.google.client_id,
          callback: WebApp.HANDLER.googleAuth.credentialResponse,
        });

        if (document.getElementById("auth_element_user-login-trigger") !== null) {
          document
            .getElementById("auth_element_user-login-trigger")
            .addEventListener("click", function () {
              setTimeout(function () {
                google.accounts.id.renderButton(
                  document.getElementById("auth_element_user-login-google"),
                  { type: "standard", theme: "outline", size: "large" }
                );
              }, 100);
            });
        }

        if (typeof Cookies.get("auth_platform") == "string") {
          switch (Cookies.get("auth_platform")) {
            case "google":
              google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                  // do something if the Google auth prompt is not displayed or is skipped
                }
              });
              break;
            default:
          }
        }
      };

      this.handleToken = function (GOOGLE_TOKEN) {
        userAuth.google.credential = GOOGLE_TOKEN;
        const parsedGoogleCredential = WebApp.HANDLER.parseJWT(userAuth.google.credential);
        userAuth.google.userInfo.name = String(parsedGoogleCredential.name);
        userAuth.google.userInfo.email = String(parsedGoogleCredential.email);
      };

      this.credentialResponse = function (GOOGLE_RESPONSE) {
        const cookieConfig = { expires: 1 };
        Cookies.set("auth_platform", "google", cookieConfig);
        WebApp.HANDLER.googleAuth.handleToken(GOOGLE_RESPONSE.credential);
        WebApp.HANDLER.googleAuth.handleRegisteredUser(GOOGLE_RESPONSE.credential);
      };

      this.handleRegisteredUser = async function (token) {
        const response = await fetch(`${BACKEND_DOMAIN}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = await response.json();

        Cookies.set("auth_token", String(token), { expires: 1 });

        if (response.status === 200) {
          window.location.reload();
        } else if (response.status === 401) {
          if (user.message.includes("There's no user with email")) {
            //수정 필요
            window.location = "/register";
          } else {
            alert("세션이 만료되었습니다.");
          }
        } else {
          alert("서버와의 통신이 원활하지 않습니다.");
        }
      };
    })();
  })();

  this.INITIATE = function () {
    {
      if (
        typeof Cookies.get("auth_token") == "string" &&
        typeof Cookies.get("auth_platform") == "string"
      ) {
        switch (Cookies.get("auth_platform")) {
          case "google":
            WebApp.HANDLER.googleAuth.handleToken(Cookies.get("auth_token"));
            break;
          default:
        }
      } else {
        WebApp.HANDLER.googleAuth.INITIATE();
      }
    }
  };
})();

window.addEventListener("load", function () {
  WebApp.INITIATE();
});
