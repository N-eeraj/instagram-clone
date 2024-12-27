import {
  use,
  useState,
} from "react"

import DisplayPicture from "@components/DisplayPicture"
import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { UserContext } from "@contexts/User"
import { ProfileViewContext } from "@contexts/Profile/View"

import { updateDp } from "@firebaseApp/store"
import createFile from "@appwriteStorage/create"
import readFile from "@appwriteStorage/read"
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
    setUserProfile,
  } = use(UserContext)
  if (!profileDetails) return

  const [isLoading, setIsLoading] = useState(false)

  if (isUserProfile && authUser && userProfile) {
    const handleDPChange = async (file: File) => {
      setIsLoading(true)
      const fileId = await createFile(file)
      updateDp(authUser.uid, fileId)
      const url = await readFile(fileId)
      setUserProfile({
        ...userProfile,
        profilePicture: fileId,
        displayPicture: url,
      })
      setProfileDetails({
        ...profileDetails,
        displayPicture: url,
      })
      setIsLoading(false)
      if (profileDetails.profilePicture) {
        removeFile(profileDetails.profilePicture)
      }
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
