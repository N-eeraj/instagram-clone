import { use } from "react"

import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { UserContext } from "@contexts/User"
import { ProfileEditContext } from "@contexts/Profile/Edit"

function ProfileUpdateDP() {
  const {
    authUser,
    userProfile,
  } = use(UserContext)
  const {
    dpUrl,
    setDpUrl,
    setDpFile,
    isLoading,
  } = use(ProfileEditContext)
  if (!(authUser && userProfile)) return

  const handleFileChange = (file: File, url: string) => {
    setDpFile(file)
    setDpUrl(url)
  }

  const handleFileRemoval = async () => {
    setDpFile(null)
    setDpUrl(undefined)
  }

  return (
    <div className="grid place-content-center place-items-center gap-y-4">
      <UpdatableDisplayPicture
        displayPicture={dpUrl}
        userName={userProfile.userName}
        loading={isLoading}
        onChange={handleFileChange} />

      { dpUrl ?
          <button
            disabled={isLoading}
            className="text-red-400"
            onClick={handleFileRemoval}>
            Remove profile photo
          </button> :
          <span className="text-primary-button">
            Set profile photo
          </span>
      }
    </div>
  )
}

export default ProfileUpdateDP
