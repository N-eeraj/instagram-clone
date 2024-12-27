import { use } from "react"
import { useNavigate } from "react-router"

import { UserContext } from "@contexts/User"
import { ProfileEditContext } from "@contexts/Profile/Edit"
import { Icon } from "@iconify/react"

function ProfileUpdateHeader() {
  const { userProfile } = use(UserContext)
  const {
    isLoading,
    password,
    updateProfile,
  } = use(ProfileEditContext)
  if (!userProfile) return

  const navigate = useNavigate()

  const goBack = () => {
    navigate(`/${userProfile.userName}`)
  }

  const handleUpdate = async () => {
    try {
      await updateProfile()
      goBack()
    } catch(error) {
      console.error(error)
    }
  }

  const invalidPassword = Boolean((password as string).length && (password as string).length < 6)

  return (
    <header className="flex justify-between items-center">
      <button
        disabled={isLoading}
        className="flex-1 text-start disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={goBack}>
        Cancel
      </button>
      <h1 className="flex-2 text-lg text-white text-center font-medium">
        Update Profile
      </h1>
      <button
        disabled={isLoading || invalidPassword}
        className="flex-1 flex justify-end text-primary-button font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={handleUpdate}>
        {isLoading ?
          <Icon
            icon="eos-icons:three-dots-loading"
            fontSize={28} /> :
          "Done"
        }
      </button>
    </header>
  )
}

export default ProfileUpdateHeader
