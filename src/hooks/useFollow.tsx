import {
  use,
  useState,
} from "react"

import { ProfileViewContext } from "@contexts/Profile/View"
import { UserContext } from "@contexts/User"
import { toggleFollowUser } from "@firebaseApp/firestore"

export default function useFollow() {
  const {
    isGuest,
    profileDetails,
    setProfileDetails,
  } = use(ProfileViewContext)

  const {
    authUser,
    userProfile,
    userFollows,
    setUserProfile,
    setUserFollows,
  } = use(UserContext)

  const [loading, setLoading] = useState(false)

  const handleFollowToggle = async (isNewFollow: boolean) => {
    if (authUser && userProfile && profileDetails?.uid) {
      setLoading(true)
      await toggleFollowUser({
        userName: profileDetails.userName,
        uid: authUser.uid,
        isNewFollow,
      })
      setProfileDetails({
        ...profileDetails,
        followers: profileDetails.followers + (isNewFollow ? 1 : -1),
      })
      setUserProfile({
        ...userProfile,
        following: userProfile.following + (isNewFollow ? 1 : -1),
      })
      let newFollowing = userFollows.following
      if (isNewFollow) {
        newFollowing.push(profileDetails.uid)
      } else {
        newFollowing = newFollowing.filter(uid => uid !== profileDetails.uid)
      }
      setUserFollows({
        ...userFollows,
        following: newFollowing,
      })
      setLoading(false)
    }
  }

  const isFollowingUser = profileDetails?.uid && userFollows.following.includes(profileDetails.uid)

  return {
    isGuest,
    loading,
    isFollowingUser,
    handleFollowToggle,
  }
}
