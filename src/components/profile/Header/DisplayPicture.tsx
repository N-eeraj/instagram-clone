import {
  use,
  useState,
} from "react"

import DisplayPicture from "@components/DisplayPicture"
import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { UserContext } from "@contexts/User"
import { ProfileViewContext } from "@contexts/Profile/View"

import useUpdateDp from "@hooks/useUpdateDp"
import removeFile from "@appwriteStorage/delete"

function ProfileDisplayPicture() {
  const {
    profileDetails,
    isUserProfile,
    setProfileDetails,
  } = use(ProfileViewContext)
  const {
    authUser,
    userProfile,
  } = use(UserContext)
  if (!profileDetails) return

  const [isLoading, setIsLoading] = useState(false)
  const { updateDpHandler } = useUpdateDp()

  if (isUserProfile && authUser && userProfile) {
    const handleDPChange = async (file: File) => {
      setIsLoading(true)
      if (userProfile.profilePicture) {
        await removeFile(userProfile.profilePicture)
      }
      const url = await updateDpHandler!(file)
      if (url) {
        setProfileDetails({
          ...profileDetails,
          displayPicture: url,
        })
      }
      setIsLoading(false)
    }

    return (
      <UpdatableDisplayPicture
        displayPicture={profileDetails.displayPicture}
        userName={profileDetails.userName}
        loading={isLoading}
        onChange={handleDPChange} />
    )
  }

  return (
    <DisplayPicture
      displayPicture={profileDetails.displayPicture}
      userName={profileDetails.userName} />
  )
}

export default ProfileDisplayPicture
