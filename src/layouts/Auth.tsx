import { Outlet } from "react-router"

import NavBar from "@components/NavBar"
import useAuthGuard from "@hooks/useAuthGuard"

function AuthLayout() {
  useAuthGuard("auth")

  return (
    <main className="relative min-h-svh bg-secondary text-zinc-300">
      <NavBar />
      <div className="max-w-5xl mx-auto px-4 lg:px-0 pb-20 md:py-5">
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
