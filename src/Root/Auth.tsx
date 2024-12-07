import {
  Navigate,
  Outlet,
  useLoaderData,
} from "react-router"

function Auth() {
  const loaderData = useLoaderData()

  return (
    loaderData ? <Navigate to="/" /> : <Outlet />
  )
}

export default Auth
