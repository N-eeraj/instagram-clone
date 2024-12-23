import { use } from "react"
import { ProfileViewContext } from "@contexts/ProfileView"
import { Icon } from "@iconify/react"
import clsx from "clsx"

function DisplayPicture() {
  const {
    profileDetails,
    isUserProfile,
  } = use(ProfileViewContext)
  if (!profileDetails) return

  if (!profileDetails.profilePicture) {
    return (
      <Icon
        icon="material-symbols:person"
        className="size-[77px] md:size-[150px] p-2 bg-zinc-700 rounded-full" />
    )
  }

  const triggerChangeDp = () => {
    console.log("change dp")
  }

  return (
    <button
      disabled={!isUserProfile}
      className={clsx(
        "relative w-fit",
        isUserProfile && "cursor-pointer",
      )}
      onClick={triggerChangeDp}>
      <img
        src={profileDetails.profilePicture}
        alt={profileDetails.userName}
        className="size-[77px] md:size-[150px] rounded-full object-cover" />
      {isUserProfile && (
        <Icon
          icon="mdi-plus"
          className="absolute right-0 bottom-0 p-1 bg-primary-button text-xl md:text-3xl rounded-full" />
      )}
    </button>
  )
}

export default DisplayPicture
