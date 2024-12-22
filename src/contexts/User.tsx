import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"

import { auth } from "@firebaseApp/auth"
import type { User } from "firebase/auth"
import type {
  UserDetails,
  UserContextType,
} from "@customTypes/user"

export const UserContext = createContext<UserContextType>({
  authUser: null,
  userDetails: null,
})

function UserContextProvider({ children }: PropsWithChildren) {
  const [authUser, setAuthUser] = useState<User | null>(JSON.parse(localStorage.getItem("authUser") ?? "null"))
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)

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
    userDetails,
  }

  return (
    <UserContext value={contextValues}>
      {children}
    </UserContext>
  )
}

export default UserContextProvider
