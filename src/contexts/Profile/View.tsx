import {
  use,
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
} from "react"
import {
  useParams,
  useNavigate,
} from "react-router"

import { UserContext } from "@contexts/User"
import { fetchProfileByUserName } from "@firebaseApp/store"
import type {
  UserProfile,
  ProfileViewContextType,
} from "@customTypes/user"

export const ProfileViewContext = createContext<ProfileViewContextType>({
  profileDetails: null,
  isUserProfile: false,
  isGuest: true,
})

function ProfileViewContextProvider({ children }: PropsWithChildren) {
  const [profileDetails, setProfileDetails] = useState<UserProfile | null>(null)
  const { userName } = useParams()
  const navigate = useNavigate()

  const fetchUserProfile = async () => {
    const profileDetails = await fetchProfileByUserName(userName as string)
    if (!profileDetails) {
      return navigate("/profile-not-found", { replace: true })
    }
    setProfileDetails(profileDetails)
  }

  useEffect(() => {
    fetchUserProfile()
  }, [userName])

  if (!profileDetails) return

  const { userProfile } = use(UserContext)
  const isUserProfile = userProfile?.userName === userName


  const contextValues = {
    profileDetails: profileDetails,
    isUserProfile,
    isGuest: !userProfile,
  }

  return (
    <ProfileViewContext value={contextValues}>
      {children}
    </ProfileViewContext>
  )
}

export default ProfileViewContextProvider
