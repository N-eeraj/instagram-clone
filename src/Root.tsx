import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
} from 'react-router-dom'

function Root() {
  const loaderData = useLoaderData()
  const { pathname } = useLocation()

  if (!loaderData) {
    return (
      <Navigate to="login" />
    )
  }

  return (
    <main>
      <h1>
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
