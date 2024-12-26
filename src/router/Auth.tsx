import AuthLayout from "@layouts/Auth"

import Home from "@pages/auth/home"
import UpdateProfile from "@pages/auth/update-profile"

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
        path: "update-profile",
        element: <UpdateProfile />,
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
