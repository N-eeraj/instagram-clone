import { createBrowserRouter } from "react-router-dom"

import Root from "@/Root"
import Home from "@pages/home"
import Login from "@pages/login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
    ],
    loader: async () => {
      return localStorage.userId ?? null
    },
  },
])

export default router
