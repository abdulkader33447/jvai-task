import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../home/Home";
import Login from "../login/Login";
import Register from "../register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
