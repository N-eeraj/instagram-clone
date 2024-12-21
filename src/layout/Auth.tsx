import {
  use,
  useEffect,
} from "react"
import {
  Outlet,
  useNavigate,
} from "react-router"

import NavBar from "@components/NavBar"
import { UserContext } from "@contexts/User"

function AuthLayout() {
  const { authUser } = use(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authUser) {
      navigate("/login")
    }
  }, [authUser])

  return (
    <main className="relative min-h-svh bg-secondary text-zinc-300">
      <NavBar />
      <div className="max-w-5xl mx-auto py-4">
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
