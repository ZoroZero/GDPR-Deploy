export function deleteAccessToken() {
  localStorage.removeItem("token");
}

export function deleteAllLocalStorageItem() {
  localStorage.clear();
}

export function setAccessToken(token) {
  setLocalStorageItem("token", token);
}

export function setLocalStorageItem(name, value) {
  localStorage.setItem(name, value);
}

export function getLocalStorageItem(name) {
  localStorage.getItem(name);
}

export function checkToken() {
  const token = localStorage.getItem("token");
  if (token !== "") {
    return token;
  }
  return null;
}
