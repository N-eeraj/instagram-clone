import { createBrowserRouter } from "react-router"

import AuthLayout from "@layout/Auth"
import GuestLayout from "@layout/Guest"
import PublicLayout from "@layout/Public"

import Home from "@pages/home"
import Login from "@pages/login"
import Register from "@pages/register"
import PageNotFound from "@pages/not-found"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: ":userName",
        element: <>element</>,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
])

export default router
