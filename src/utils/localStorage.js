/**
 *
 * @param {*} key String
 * @param {*} value String
 * @param {*} ttl Number : in seconds
 */
export function setItemWithExpire(key, value, ttl) {
  const date = new Date();
  const now = date.getTime();
  const expireIn = now + ttl * 1000;
  window.localStorage.setItem(key, JSON.stringify({ value, expireIn }));
}
export function getItemWithExpire(key) {
  const date = new Date();
  const now = date.getTime();
  const data =
    (window.localStorage.getItem(key) &&
      JSON.parse(window.localStorage.getItem(key))) ||
    null;
  if (data && now < data.expireIn) {
    return data.value;
  } else {
    window.localStorage.removeItem(key);
    return null;
  }
}
