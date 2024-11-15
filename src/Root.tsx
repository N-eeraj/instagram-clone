import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
} from "react-router-dom"

import app from '@firebaseApp/init'

function Root() {
  const loaderData = useLoaderData()
  const { pathname } = useLocation()

  if (!loaderData) {
    return (
      <Navigate to="login" />
    )
  }

  console.log(app)


  return (
    <main>
      <h1 className="text-xl">
        Main Page
      </h1>
      {
        pathname === "/login" ?
        <Navigate to="/" /> :
        <Outlet />
      }
    </main>
  )
}

export default Root
