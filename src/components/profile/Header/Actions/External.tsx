import Button from "@components/ui/Button"
import useFollow from "@hooks/useFollow"

function ProfileActions() {
  const {
    isGuest,
    loading,
    isFollowingUser,
    handleFollowToggle,
  } = useFollow()

  return (
    <>
      <Button
        disabled={isGuest}
        loading={loading}
        grayOnDisable
        className="flex-1 md:grow-0"
        onClick={() => handleFollowToggle(!isFollowingUser)}>
        {isFollowingUser ? "Unfollow" : "Follow"}
      </Button>
    </>
  )
}

export default ProfileActions
