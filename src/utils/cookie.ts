export function getCookie(key: string): string {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') // eslint-disable-line
  );
  return matches ? decodeURIComponent(matches[1]) : "";
}

export function trimTokenBearer(token: string): string {
  if (token.indexOf('Bearer') === 0) {
    return token.split('Bearer ')[1];
  } else {
    return token;
  }
} 

export function setCookie(key: string, value: string): void {
  value = encodeURIComponent(value);
  const daysToExpire = new Date(2147483647 * 1000).toUTCString()
  document.cookie = key + '=' + value+'; expires=' + daysToExpire + '; path=/';
} 

export function deleteCookie(key: string): void {
  console.log('Delete cookie')
  const date: Date = new Date();
  date.setTime(date.getTime() - 1000);
  const updatedCookie: string = key + '="";expires=' + date.toUTCString() + '; path=/';
  console.log('Cookie to delete: '+updatedCookie)
  document.cookie = updatedCookie;
}