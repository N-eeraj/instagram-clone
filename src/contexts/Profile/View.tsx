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
import { fetchProfileByUserName, fetchUserPosts } from "@firebaseApp/firestore"
import { readFile } from "@appwriteApp/storage"

import type {
  UserProfile,
  ProfileViewContextType,
} from "@customTypes/user"
import type { PostListItemType } from "@customTypes/post"

export const ProfileViewContext = createContext<ProfileViewContextType>({
  profileDetails: null,
  isUserProfile: false,
  isGuest: true,
  profilePosts: [],
  setProfileDetails: (_args: UserProfile | null) => {},
})

function ProfileViewContextProvider({ children }: PropsWithChildren) {
  const [profileDetails, setProfileDetails] = useState<UserProfile | null>(null)
  const [profilePosts, setProfilePosts] = useState<PostListItemType[]>([])
  const { userName } = useParams()
  const navigate = useNavigate()

  const fetchUserProfile = async () => {
    const profileDetails = await fetchProfileByUserName(userName as string)
    const profilePostsData = await fetchUserPosts(userName as string)
    setProfilePosts(profilePostsData)
    if (!profileDetails) {
      return navigate("/profile-not-found", { replace: true })
    }
    if (profileDetails.profilePicture) {
      profileDetails.displayPicture = await readFile(profileDetails.profilePicture)
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
    profilePosts,
    setProfileDetails,
  }

  return (
    <ProfileViewContext value={contextValues}>
      {children}
    </ProfileViewContext>
  )
}

export default ProfileViewContextProvider
