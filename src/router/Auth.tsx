import AuthLayout from "@layouts/Auth"

import Home from "@pages/auth/home"
import EditProfile from "@pages/auth/edit-profile"

const authRoutes = [
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
        element: <EditProfile />,
      },
      {
        path: ":userName/followers",
        element: <>followers</>,
      },

      {
        path: ":userName/following",
        element: <>following</>,
      },
    ],
  },
]

export default authRoutes
