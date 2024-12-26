import { use } from "react"
import { ProfileEditContext } from "@contexts/Profile/Edit"

function ProfileUpdateForm() {
  const {
    userName,
    fullName,
    bio,
    setInput
  } = use(ProfileEditContext)


  return (
    <form>
      {userName}
      {fullName}
      {bio}
    </form>
  )
}

export default ProfileUpdateForm
