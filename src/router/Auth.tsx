import AuthLayout from "@layouts/Auth"

import Home from "@pages/auth/home"
import UpdateProfile from "@pages/auth/update-profile"
import Post from "@pages/auth/post/index"
import NewPost from "@pages/auth/post/new.tsx"
import EditPost from "@pages/auth/post/edit.tsx"

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
        path: "new-post",
        element: <NewPost />,
      },
      {
        path: ":userName/followers",
        element: <>followers</>,
      },
      {
        path: ":userName/following",
        element: <>following</>,
      },
      {
        path: ":userName/:postId",
        element: <Post />,
      },
      {
        path: ":userName/:postId/edit",
        element: <EditPost />,
      },
    ],
  },
]

export default authRoutes
