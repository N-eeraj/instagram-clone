import { use } from "react"
import { Outlet } from "react-router"

import AuthNavBar from "@components/NavBar/Auth"
import GuestNavBar from "@components/NavBar/Guest"
import { UserContext } from "@contexts/User"

function PublicLayout() {
  const { userDetails } = use(UserContext)

  return (
    <main className="relative min-h-svh bg-secondary text-zinc-300">
      {userDetails ?
        <AuthNavBar /> :
        <GuestNavBar />
      }
      <div className="max-w-5xl mx-auto pt-4 pb-20 px-4 lg:px-0 md:py-5">
        <Outlet />
      </div>
    </main>
  )
}

export default PublicLayout
