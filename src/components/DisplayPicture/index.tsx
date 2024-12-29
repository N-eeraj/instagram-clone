import { Icon } from "@iconify/react"
import clsx from "clsx"
import type { DisplayPictureType } from "@customTypes/user"

function DisplayPicture({ displayPicture, userName, className }: DisplayPictureType & { className?: string }) {
  if (displayPicture) {
    return (
      <img
        src={displayPicture}
        alt={userName}
        className={clsx(
          "size-[77px] md:size-[150px] rounded-full object-cover",
          className,
        )} />
    )
  }

  return (
    <Icon
      icon="material-symbols:person"
      className={clsx(
        "size-[77px] md:size-[150px] p-2 bg-zinc-700 rounded-full",
        className,
      )} />
  )
}

export default DisplayPicture
