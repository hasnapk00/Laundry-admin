import api from "./axios";

export const loginApi = (data) => {
  return api.post("/Auth/Login", data);
};


export const logoutApi = () => {
  return api.post("/Auth/Logout");
};
