import { createBrowserRouter } from "react-router"

import AuthLayout from "@layouts/Auth"
import GuestLayout from "@layouts/Guest"
import PublicLayout from "@layouts/Public"

import Home from "@pages/home"
import Login from "@pages/login"
import Register from "@pages/register"
import Profile from "@pages/profile"
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
      {
        path: "edit-profile",
        element: <>Edit Profile</>,
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
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "followers",
            element: <>followers</>,
          },
          {
            path: "following",
            element: <>following</>,
          },
        ],
      },
      {
        path: "profile-not-found",
        element: <PageNotFound />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
])

export default router
