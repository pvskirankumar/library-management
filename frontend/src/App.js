import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./pages/book";
import RootLayout from "./pages/RootLayout";
import { logoutAction, tokenLoader } from "./utils/functionUtils";
import AdminDashboard from "./components/AdminDashboard";
import AuthenticationPage, { action as loginAction } from "./pages/AuthenticationPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader: tokenLoader,
      id: "root",
      children: [
        {
          path: "/admin",
          element: <AdminDashboard />
        },
        {
          path: "/books",
          element: <Books />,
        },
        {
          path: "/auth",
          element: <AuthenticationPage />,
          action: loginAction,
        },
        {
          path: "logout",
          action: logoutAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
