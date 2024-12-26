import { use } from "react"
import ProfileUpdateHeader from "@components/profile/update/Header"
import UpdatableDisplayPicture from "@components/DisplayPicture/Updatable"
import { UserContext } from "@contexts/User"

function UpdateProfile() {
  const { userProfile } = use(UserContext)
  if (!userProfile) return

  return (
    <section className="flex flex-col gap-y-4">
      <ProfileUpdateHeader />

      <div className="grid place-content-center place-items-center gap-y-4">
        <UpdatableDisplayPicture
          profilePicture={userProfile.profilePicture}
          userName={userProfile.userName} />
        <span className="text-primary-button">
          Change profile photo
        </span>
      </div>
    </section>
  )
}

export default UpdateProfile
