import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"

import { auth } from "@firebaseApp/auth"
import { fetchProfileByUid } from "@firebaseApp/store"
import type { User } from "firebase/auth"
import type {
  UserProfile,
  UserContextType,
} from "@customTypes/user"

export const UserContext = createContext<UserContextType>({
  authUser: null,
  userProfile: null,
})

function UserContextProvider({ children }: PropsWithChildren) {
  const [authUser, setAuthUser] = useState<User | null>(JSON.parse(localStorage.getItem("authUser") ?? "null"))
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  const handleAuthState = () => {
    auth.onAuthStateChanged(async (authUser) => {
      setAuthUser(authUser)
      localStorage.setItem("authUser", JSON.stringify(authUser))
      if (authUser) {
        setLoadingProfile(true)
        const userProfile = await fetchProfileByUid(authUser.uid)
        setUserProfile(userProfile)
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
    userProfile,
  }

  return (
    <UserContext value={contextValues}>
      {!loadingProfile && children}
    </UserContext>
  )
}

export default UserContextProvider
