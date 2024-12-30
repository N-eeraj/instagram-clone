import AuthLayout from "@layouts/Auth"

import Home from "@pages/auth/home"
import UpdateProfile from "@pages/auth/update-profile"
import NewPost from "@pages/auth/new-post.tsx"
import Post from "@pages/auth/post"

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
    ],
  },
]

export default authRoutes
