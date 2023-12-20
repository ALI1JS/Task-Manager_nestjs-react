export const saveTokenInLocalStorage = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const retriveToken = () => {
  return localStorage.getItem("access_token");
};
