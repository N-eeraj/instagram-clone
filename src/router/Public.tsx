import PublicLayout from "@layouts/Public"

import Profile from "@pages/public/profile"
import PageNotFound from "@pages/public/not-found"

const publicRoutes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: ":userName",
        element: <Profile />,
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
]

export default publicRoutes
