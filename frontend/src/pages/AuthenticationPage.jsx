import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export const AuthenticationPage = () => {
  return <AuthForm />;
};

export async function action({ request }) {
  const data = await request.formData();
  const authDataObj = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const loginResp = await fetch("http://localhost:3002/api/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authDataObj),
  });


  if (loginResp.status === 401) {
    return loginResp;
  }

  if (loginResp.status === 200) {
    const lognResponse = await loginResp.json();
    localStorage.setItem("token", lognResponse.token);
    localStorage.setItem("userType", lognResponse.type);
  }

  return redirect("/");
}

export default AuthenticationPage;