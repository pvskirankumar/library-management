import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return token;
};

export const getUserType = () => {
  const userType = localStorage.getItem("userType");
  return !userType ? null : userType;
};

export const tokenLoader = () => {
  return { token: getAuthToken(), userType: getUserType() };
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth?mode=login");
  }
};

export const logoutAction = () => {
  if (localStorage.getItem("userType") === "google") {
    localStorage.removeItem("userType");
    window.google?.accounts.id.revoke(getAuthToken(), () => {
      localStorage.clear();
    });
  }
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  return redirect("/");
};
