export function postRequesAuth(
  url,
  body,
  token = window.localStorage.getItem("Authorization")
) {
  return fetch(url, {
    method: "post",
    body: JSON.stringify({ ...body, Authorization: token }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      // throw {error:`response error on ${url}`}
    }
  });
}

export function getRequestAuth(url) {
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      // throw {error:`response error on ${}`}
    }
  });
}
