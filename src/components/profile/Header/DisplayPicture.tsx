import { use } from "react"
import DisplayPicture from "@components/DisplayPicture"
import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { ProfileViewContext } from "@contexts/ProfileView"

function ProfileDisplayPicture() {
  const {
    profileDetails,
    isUserProfile,
  } = use(ProfileViewContext)
  if (!profileDetails) return

  if (isUserProfile) {
    return (
      <UpdatableDisplayPicture
        profilePicture={profileDetails.profilePicture}
        userName={profileDetails.userName} />
    )
  }

  return (
    <DisplayPicture
      profilePicture={profileDetails.profilePicture}
      userName={profileDetails.userName} />
  )
}

export default ProfileDisplayPicture
