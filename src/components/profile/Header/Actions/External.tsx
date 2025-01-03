import {
  use,
  useState,
} from "react"
import Button from "@components/ui/Button"
import { ProfileViewContext } from "@contexts/Profile/View"
import { UserContext } from "@contexts/User"
import {
  followUser,
  unFollowUser,
} from "@firebaseApp/firestore"

function ProfileActions() {
  const {
    isGuest,
    profileDetails,
    setProfileDetails,
  } = use(ProfileViewContext)
  if (!(profileDetails && profileDetails.uid)) return
  const {
    authUser,
    userProfile,
    userFollows,
    setUserProfile,
    setUserFollows,
  } = use(UserContext)

  const [loading, setLoading] = useState(false)

  const handleFollowUser = async () => {
    if (authUser && userProfile && profileDetails.uid) {
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
      setUserFollows({
        ...userFollows,
        following: [
          ...userFollows.following,
          profileDetails.uid,
        ]
      })
      setLoading(false)
    }
  }

  const handleUnfollowUser = async () => {
    if (authUser && userProfile && profileDetails.uid) {
      setLoading(true)
      await unFollowUser({
        userName: profileDetails.userName,
        uid: authUser.uid,
      })
      setProfileDetails({
        ...profileDetails,
        followers: profileDetails.followers - 1,
      })
      setUserProfile({
        ...userProfile,
        following: userProfile.following - 1,
      })
      setUserFollows({
        ...userFollows,
        following: userFollows.following.filter(uid => uid !== profileDetails.uid),
      })
      setLoading(false)
    }
  }

  if (userFollows.following.includes(profileDetails.uid)) {
   return (
      <>
        <Button
          disabled={isGuest}
          loading={loading}
          grayOnDisable
          className="flex-1 md:grow-0"
          onClick={handleUnfollowUser}>
          Unfollow
        </Button>
      </>
    )
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
