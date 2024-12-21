import {
  use,
  useEffect,
} from "react"
import {
  Outlet,
  useNavigate,
} from "react-router"

import { UserContext } from "@contexts/User"

function GuestLayout() {
  const { authUser } = use(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (authUser) {
      navigate("/")
    }
  }, [authUser])

  return (
    <Outlet />
  )
}

export default GuestLayout
