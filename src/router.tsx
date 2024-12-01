import { createBrowserRouter } from "react-router-dom"

import Root from "@/Root"
import Home from "@pages/home"
import Login from "@pages/login"

const userIdLoader = () => {
  return localStorage.user ?? null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ],
    loader: userIdLoader
  },
  {
    path: "/login",
    element: <Login />,
    loader: userIdLoader
  },
])

export default router
