import {
  useState,
  useEffect,
} from "react"
import {
  useParams,
  useNavigate,
} from "react-router"

import ProfileHeader from "@components/profile/Header"
import { fetchProfileByUserName } from "@firebaseApp/store"
import type { UserProfile } from "@customTypes/user"

function Profile() {
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

  return (
    <>
      <ProfileHeader {...profileDetails} />
    </>
  )
}

export default Profile
