import { use } from "react"
import Button from "@components/ui/Button"
import { ProfileViewContext } from "@contexts/ProfileView"

function ProfileActions() {
  const {
    profileDetails,
    isGuest
  } = use(ProfileViewContext)
  if (!profileDetails) return

  const followUser = async () => {
    console.log("follow", profileDetails.userName)
  }

  return (
    <>
      <Button
        disabled={isGuest}
        grayOnDisable
        className="flex-1 md:grow-0"
        onClick={followUser}>
        Follow
      </Button>
    </>
  )
}

export default ProfileActions
