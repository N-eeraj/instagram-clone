import {
  Navigate,
  Outlet,
  useLoaderData,
} from "react-router-dom"

function Root() {
  const loaderData = useLoaderData()

  if (!loaderData) {
    return (
      <Navigate to="/login" />
    )
  }

  return (
    <main className="bg-black text-primary-text">
      <h1 className="text-xl">
        Main Page
      </h1>
      <Outlet />
    </main>
  )
}

export default Root
