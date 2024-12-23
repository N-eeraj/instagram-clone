import {
  useState,
  useEffect,
} from "react"
import ProfileHeader from "@components/profile/Header"
import { fetchProfileByUserName } from "@firebaseApp/store"
import type { UserProfile } from "@customTypes/user"

function Profile() {
  const [profileDetails, setProfileDetails] = useState<UserProfile | null>(null)

  const fetchUserProfile = async () => {
    const profileDetails = await fetchProfileByUserName("super_admin")
    setProfileDetails(profileDetails)
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  return (
    <>
      <ProfileHeader profileDetails={profileDetails} />
    </>
  )
}

export default Profile
