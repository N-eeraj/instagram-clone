import { Outlet } from "react-router"

import AuthNavBar from "@components/NavBar/Auth"
import useAuthGuard from "@hooks/useAuthGuard"

function AuthLayout() {
  useAuthGuard("auth")

  return (
    <main className="relative min-h-svh bg-secondary text-zinc-300">
      <AuthNavBar />
      <div className="max-w-5xl mx-auto pt-4 pb-20 px-4 lg:px-0 md:py-5">
        <Outlet />
      </div>
    </main>
  )
}

export default AuthLayout
