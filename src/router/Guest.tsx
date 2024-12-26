import GuestLayout from "@layouts/Guest"

import Login from "@pages/guest/login"
import Register from "@pages/guest/register"

const guestRoutes = [
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
]

export default guestRoutes
