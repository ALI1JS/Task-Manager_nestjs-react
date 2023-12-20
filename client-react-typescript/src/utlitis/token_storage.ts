export const saveTokenInLocalStorage = (token: string) => {
  sessionStorage.setItem("access_token", token);
};

export const retriveToken = () => {
  return sessionStorage.getItem("access_token");
};
