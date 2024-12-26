import { use } from "react"
import { useNavigate } from "react-router"

import { UserContext } from "@contexts/User"

function ProfileUpdateHeader() {
  const { userProfile } = use(UserContext)
  if (!userProfile) return

  const navigate = useNavigate()

  const goBack = () => {
    navigate(`/${userProfile.userName}`)
  }

  const handleUpdate = async () => {
    goBack()
  }

  return (
    <header className="flex justify-between items-center">
      <button
        className="flex-1 text-start"
        onClick={goBack}>
        Cancel
      </button>
      <h1 className="flex-2 text-lg text-white text-center font-medium">
        Update Profile
      </h1>
      <button
        className="flex-1 text-primary-button text-end font-semibold"
        onClick={handleUpdate}>
        Done
      </button>
    </header>
  )
}

export default ProfileUpdateHeader
