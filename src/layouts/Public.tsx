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
        <AuthNavBar />:
        <GuestNavBar />
      }
      <Outlet />
    </main>
  )
}

export default PublicLayout
