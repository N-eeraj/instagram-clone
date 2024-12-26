import { Icon } from "@iconify/react"
import type { DisplayPictureType } from "@customTypes/user"

function DisplayPicture({ displayPicture, userName }: DisplayPictureType) {
  if (displayPicture) {
    return (
      <img
        src={displayPicture}
        alt={userName}
        className="size-[77px] md:size-[150px] rounded-full object-cover" />
    )
  }

  return (
    <Icon
      icon="material-symbols:person"
      className="size-[77px] md:size-[150px] p-2 bg-zinc-700 rounded-full" />
  )
}

export default DisplayPicture
