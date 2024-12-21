import {
  use,
  useEffect,
} from "react"
import { useNavigate } from "react-router"

import { UserContext } from "@contexts/User"

type GuardType = "auth" | "guest"

export default function useAuthGuard(guard: GuardType) {
  const { authUser } = use(UserContext)
  const navigate = useNavigate()

  const navigateToPage: Record<GuardType, Function> = {
    auth: () => !authUser && navigate("/login"),
    guest: () => authUser && navigate("/")
  }

  useEffect(() => {
    navigateToPage[guard]?.()
  }, [authUser])
}
