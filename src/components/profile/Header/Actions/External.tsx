import Button from "@components/ui/Button"
import type { UserProfile } from "@customTypes/user"

interface ProfileActionsProps {
  profileDetails: UserProfile
  isGuest: boolean
}

function ProfileActions({ profileDetails, isGuest }: ProfileActionsProps) {
  return (
    <>
      <Button
        disabled={isGuest}
        grayOnDisable
        className="flex-1 md:grow-0">
        Follow
      </Button>
    </>
  )
}

export default ProfileActions
