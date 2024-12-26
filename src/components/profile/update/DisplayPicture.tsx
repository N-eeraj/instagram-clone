import {
  use,
  useState,
} from "react"
import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { UserContext } from "@contexts/User"

function ProfileUpdateDP() {
  const { userProfile } = use(UserContext)
  if (!userProfile) return

  const [dp, setDp] = useState(userProfile.profilePicture)

  const handleFileChange = (file: File, tempUrl: string) => {
    setDp(tempUrl)
  }

  return (
    <div className="grid place-content-center place-items-center gap-y-4">
      <UpdatableDisplayPicture
        profilePicture={dp}
        userName={userProfile.userName}
        onChange={handleFileChange} />
      <span className="text-primary-button">
        Change profile photo
      </span>
    </div>
  )
}

export default ProfileUpdateDP
