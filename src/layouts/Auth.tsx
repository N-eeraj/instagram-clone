import { Outlet } from "react-router"

import NavBar from "@components/NavBar"
import useAuthGuard from "@hooks/useAuthGuard"

function AuthLayout() {
  useAuthGuard("auth")

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
