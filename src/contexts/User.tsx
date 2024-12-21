import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"

import { auth } from "@firebaseApp/auth"
import type { User } from "firebase/auth"

interface UserContext {
  authUser: User | null
  setAuthUser: Function
}

export const UserContext = createContext<UserContext>({
  authUser: null,
  setAuthUser: (_args: User | null) => {},
})

function UserContextProvider({ children }: PropsWithChildren) {
  const [authUser, setAuthUser] = useState<User | null>(JSON.parse(localStorage.getItem("authUser") ?? "null"))

  const handleAuthState = () => {
    auth.onAuthStateChanged((authUser) => {
      setAuthUser(authUser)
      localStorage.setItem("authUser", JSON.stringify(authUser))
    })
  }

  useEffect(() => {
    handleAuthState()
  }, [])

  const contextValues = {
    authUser,
    setAuthUser,
  }

  return (
    <UserContext value={contextValues}>
      {children}
    </UserContext>
  )
}

export default UserContextProvider
