import { use } from "react"
import { useNavigate } from "react-router"

import ActionHeader from "@components/ui/ActionHeader"
import { UserContext } from "@contexts/User"
import { ProfileEditContext } from "@contexts/Profile/Edit"

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
    <ActionHeader
      title="Update Profile"
      action={{
        disabled: invalidPassword,
        loading: isLoading,
        onClick: handleUpdate,
      }}
      canceled={{
        disabled: isLoading,
        onClick: goBack,
      }} />
  )
}

export default ProfileUpdateHeader
