import {
  useState,
  useEffect,
  createContext,
  type PropsWithChildren,
} from "react"

import { auth } from "@firebaseApp/auth"
import {
  fetchFollowings,
  fetchProfileByUid,
} from "@firebaseApp/firestore"
import { readFile } from "@appwriteApp/storage"

import type { User } from "firebase/auth"
import type {
  UserProfile,
  UserContextType,
  UserFollowsType,
} from "@customTypes/user"

const initUserFollows = {
  followers: [],
  following: [],
}

export const UserContext = createContext<UserContextType>({
  authUser: null,
  userProfile: null,
  userFollows: initUserFollows,
  setUserProfile: (_args: UserProfile | null) => {},
  setUserFollows: (_args: UserFollowsType) => {},
})

function UserContextProvider({ children }: PropsWithChildren) {
  const [authUser, setAuthUser] = useState<User | null>(JSON.parse(localStorage.getItem("authUser") ?? "null"))
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [userFollows, setUserFollows] = useState<UserFollowsType>(initUserFollows)

  const handleAuthState = () => {
    auth.onAuthStateChanged(async (authUser) => {
      setAuthUser(authUser)
      localStorage.setItem("authUser", JSON.stringify(authUser))
      if (authUser) {
        setLoadingProfile(true)
        const userProfile = await fetchProfileByUid(authUser.uid)
        const userFollows = await fetchFollowings(authUser.uid)
        setUserFollows(userFollows)
        if (userProfile.profilePicture) {
          userProfile.displayPicture = await readFile(userProfile.profilePicture)
        }
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
    userFollows,
    setUserProfile,
    setUserFollows,
  }

  return (
    <UserContext value={contextValues}>
      {!loadingProfile && children}
    </UserContext>
  )
}

export default UserContextProvider
