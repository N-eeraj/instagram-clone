import { createBrowserRouter } from "react-router"

import Root from "@/Root"
import Home from "@pages/home"
import Login from "@pages/login"
import PageNotFound from "@pages/not-found"

const userIdLoader = () => {
  return localStorage.user ?? null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: userIdLoader,
    children: [
      {
        index: true,
        element: <Home />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: userIdLoader
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
])

export default router
