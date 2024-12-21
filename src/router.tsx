import { createBrowserRouter } from "react-router"

import Root from "@/Root"
import AuthRoot from "@/Root/Auth"

import Home from "@pages/home"
import Login from "@pages/login"
import Register from "@pages/register"
import PageNotFound from "@pages/not-found"

const uidLoader = () => {
  return localStorage.user ?? null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: uidLoader,
    children: [
      {
        index: true,
        element: <Home />
      },
    ],
  },
  {
    path: "/",
    element: <AuthRoot />,
    loader: uidLoader,
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
    path: "*",
    element: <PageNotFound />,
  },
])

export default router
