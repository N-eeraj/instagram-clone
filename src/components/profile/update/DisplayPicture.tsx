import {
  use,
  useState,
} from "react"

import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { UserContext } from "@contexts/User"
import { Icon } from "@iconify/react/dist/iconify.js"

import removeFile from "@appwriteStorage/delete"
import { deleteDP } from "@firebaseApp/store"

function ProfileUpdateDP() {
  const {
    authUser,
    userProfile,
    setUserProfile,
  } = use(UserContext)
  if (!(authUser && userProfile)) return

  const [dp, setDp] = useState<string | undefined>(userProfile.displayPicture)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (file: File, url: string) => {
    setDp(url)
  }

  const handleFileRemoval = async () => {
    setDp(undefined)
    if (userProfile.profilePicture) {
      setIsLoading(true)
      await deleteDP(authUser.uid)
      await removeFile(userProfile.profilePicture)
      setUserProfile({
        ...userProfile,
        profilePicture: undefined,
        displayPicture: undefined,
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="grid place-content-center place-items-center gap-y-4">
      <UpdatableDisplayPicture
        displayPicture={dp}
        userName={userProfile.userName}
        onChange={handleFileChange} />

      { userProfile.profilePicture ?
          <button
            disabled={isLoading}
            className="text-red-400"
            onClick={handleFileRemoval}>
            {isLoading ?
              <Icon
                icon="eos-icons:three-dots-loading"
                fontSize={32} /> :
              "Remove profile photo"
            }
          </button> :
          <span className="text-primary-button">
            Set profile photo
          </span>
      }
    </div>
  )
}

export default ProfileUpdateDP
