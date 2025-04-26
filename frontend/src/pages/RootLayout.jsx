import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) return;

    if (token === "tokenExpired") {
      submit(null, { method: "post", action: "/logout" });
      return;
    }
  }, [token, submit]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-4">
        <MainNavigation />
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
