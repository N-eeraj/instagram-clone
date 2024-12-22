import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"

import { auth } from "@firebaseApp/auth"
import { fetchUserProfile } from "@firebaseApp/store"
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
  const [loadingProfile, setLoadingProfile] = useState(true)

  const handleAuthState = () => {
    auth.onAuthStateChanged(async (authUser) => {
      setAuthUser(authUser)
      localStorage.setItem("authUser", JSON.stringify(authUser))
      if (authUser) {
        setLoadingProfile(true)
        const userDetails = await fetchUserProfile(authUser.uid)
        setUserDetails(userDetails)
        setLoadingProfile(false)
      } else {
        setLoadingProfile(false)
      }
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
      {!loadingProfile && children}
    </UserContext>
  )
}

export default UserContextProvider
