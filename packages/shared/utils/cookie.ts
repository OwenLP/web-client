export const getCookie = (cookieName: string): string | undefined => {
  const name = encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&");
  const regExp = new RegExp(
    `(?:(?:^|.*;)\\s*${name}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );
  const cookie = document.cookie.replace(regExp, "$1");
  return decodeURIComponent(cookie) || undefined;
};
