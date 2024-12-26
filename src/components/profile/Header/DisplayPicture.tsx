import { use } from "react"

import DisplayPicture from "@components/DisplayPicture"
import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { UserContext } from "@contexts/User"
import { ProfileViewContext } from "@contexts/Profile/View"

import createFile from "@appwriteStorage/create"
import { updateDp } from "@firebaseApp/store"
import readFile from "@/libs/appwrite/read"

function ProfileDisplayPicture() {
  const {
    profileDetails,
    isUserProfile,
  } = use(ProfileViewContext)
  const {
    authUser,
    userProfile,
    setUserProfile,
  } = use(UserContext)
  if (!profileDetails) return

  if (isUserProfile && authUser && userProfile) {
    const handleDPChange = async (file: File) => {
      const fileId = await createFile(file)
      updateDp(authUser.uid, fileId)
      const url = await readFile(fileId)
      setUserProfile({
        ...userProfile,
        profilePicture: fileId,
        displayPicture: url,
      })
    }

    return (
      <UpdatableDisplayPicture
        displayPicture={profileDetails.displayPicture}
        userName={profileDetails.userName}
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
