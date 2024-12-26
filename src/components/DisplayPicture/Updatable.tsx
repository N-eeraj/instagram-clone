import DisplayPicture from "@components/DisplayPicture"
import { Icon } from "@iconify/react"
import type { DisplayPictureType } from "@customTypes/user"

function UpdatableDisplayPicture({ profilePicture, userName }: DisplayPictureType) {
  const triggerChangeDp = () => {
    console.log("change dp")
  }

  return (
    <button
      className="relative w-fit cursor-pointer"
      onClick={triggerChangeDp}>

      <DisplayPicture
        profilePicture={profilePicture}
        userName={userName} />

      {!profilePicture && (
        <Icon
          icon="mdi-plus"
          className="absolute right-0 bottom-0 p-1 bg-primary-button text-xl md:text-3xl rounded-full" />
      )}
    </button>
  )
}

export default UpdatableDisplayPicture