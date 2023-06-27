export function getCookie(key: string): string {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}

export function setCookie(key: string, value: string): void {
  value = encodeURIComponent(value);
  document.cookie = key + '=' + value;
} 

export function deleteCookie(key: string): void {
  const date: Date = new Date();
  date.setTime(date.getTime() - 1000);
  const updatedCookie: string = key + '="";expires=' + date.toUTCString();
  document.cookie = updatedCookie;
}