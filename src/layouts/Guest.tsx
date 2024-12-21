import { Outlet } from "react-router"

import useAuthGuard from "@hooks/useAuthGuard"

function GuestLayout() {
  useAuthGuard("guest")

  return (
    <Outlet />
  )
}

export default GuestLayout
