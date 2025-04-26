import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export const GoogleAuthPage = () => {

  const handleLoginSuccess = (credentialResponse) => {
    localStorage.setItem("token", credentialResponse.credential);
    localStorage.setItem("userType", "google");

    fetch("http://localhost:3002/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email_verified) {
          window.location.href = "/";
        }
      })
      .catch((err) => console.error("Error verifying token:", err));
  };

  return (
    <GoogleOAuthProvider clientId="690661452861-1g6pq39l660n5nrh9hasaptmb5f6l1ar.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.log("Login Failed");
        }}
      ></GoogleLogin>
    </GoogleOAuthProvider>
  );
};
