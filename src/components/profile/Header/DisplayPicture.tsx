import { use } from "react"

import DisplayPicture from "@components/DisplayPicture"
import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { ProfileViewContext } from "@contexts/Profile/View"
import createFile from "@appwriteStorage/create"

function ProfileDisplayPicture() {
  const {
    profileDetails,
    isUserProfile,
  } = use(ProfileViewContext)
  if (!profileDetails) return

  if (isUserProfile) {
    const handleDPChange = async (file: File) => {
      const fileId = await createFile(file)
      console.log(fileId.$id)
    }

    return (
      <UpdatableDisplayPicture
        profilePicture={profileDetails.profilePicture}
        userName={profileDetails.userName}
        onChange={handleDPChange} />
    )
  }

  return (
    <DisplayPicture
      profilePicture={profileDetails.profilePicture}
      userName={profileDetails.userName} />
  )
}

export default ProfileDisplayPicture
