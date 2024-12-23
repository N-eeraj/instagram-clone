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
    auth: () => !authUser && navigate("/login", { replace: true }),
    guest: () => authUser && navigate("/", { replace: true }),
  }

  useEffect(() => {
    navigateToPage[guard]?.()
  }, [authUser])
}
