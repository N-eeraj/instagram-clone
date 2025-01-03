import { use, useState } from "react"
import Button from "@components/ui/Button"
import { ProfileViewContext } from "@contexts/Profile/View"
import { UserContext } from "@contexts/User"
import { followUser } from "@firebaseApp/firestore"

function ProfileActions() {
  const {
    isGuest,
    profileDetails,
    setProfileDetails,
  } = use(ProfileViewContext)
  if (!profileDetails) return
  const {
    authUser,
    userProfile,
    setUserProfile,
  } = use(UserContext)

  const [loading, setLoading] = useState(false)

  const handleFollowUser = async () => {
    if (authUser && userProfile) {
      setLoading(true)
      await followUser({
        userName: profileDetails.userName,
        uid: authUser.uid,
      })
      setProfileDetails({
        ...profileDetails,
        followers: profileDetails.followers + 1,
      })
      setUserProfile({
        ...userProfile,
        following: userProfile.following + 1,
      })
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        disabled={isGuest}
        loading={loading}
        grayOnDisable
        className="flex-1 md:grow-0"
        onClick={handleFollowUser}>
        Follow
      </Button>
    </>
  )
}

export default ProfileActions
