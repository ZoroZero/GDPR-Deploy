// export function deleteAllCookies() {
//   const cookies = document.cookie.split(";");
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i];
//     const eqPos = cookie.indexOf("=");
//     const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//     document.cookie = `${name} =;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
//   }
// }

// export function setCookie(cname, cvalue, hours) {
//   const d = new Date();
//   d.setTime(d.getTime() + hours * 60 * 60 * 1000); // (exdays * 24 * 60 * 60 * 1000));
//   const expires = `expires=${d.toUTCString()}`;
//   document.cookie = `${cname}=${cvalue};${expires};path=/`;
// }

// export function getCookie(cname) {
//   const name = `${cname}=`;
//   const ca = document.cookie.split(";");

//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     c = c.trim();
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }

//   return "";
// }

// export function checkToken() {
//   const token = getCookie("token");
//   if (token !== "") {
//     return token;
//   }
//   return null;
// }
export function deleteAccessToken() {
  localStorage.removeItem("token");
}

export function setAccessToken(token) {
  localStorage.setItem("token", token);
}

export function checkToken() {
  const token = localStorage.getItem("token");
  if (token !== "") {
    return token;
  }
  return null;
}
