import {
  useId,
  ChangeEvent,
} from "react"
import DisplayPicture from "@components/DisplayPicture"
import { Icon } from "@iconify/react"
import type { DisplayPictureType } from "@customTypes/user"

type DisplayPictureProps = DisplayPictureType & { onChange: (_file:  File, url: string) => any }

function UpdatableDisplayPicture({ displayPicture, userName, onChange }: DisplayPictureProps) {
  const inputId = useId()

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const files = target.files
    if (files && files.length) {
      const file = files[0]
      onChange(file, URL.createObjectURL(file))
    }
  }

  return (
    <label
      htmlFor={inputId}
      className="relative w-fit cursor-pointer">

      <input
        id={inputId}
        type="file"
        hidden
        className="hidden"
        accept=".png, .jpeg, .webp, .heic, .avif"
        onChange={handleFileChange} />

      <DisplayPicture
        displayPicture={displayPicture}
        userName={userName} />

      {!displayPicture && (
        <Icon
          icon="mdi-plus"
          className="absolute right-0 bottom-0 p-1 bg-primary-button text-xl md:text-3xl rounded-full" />
      )}
    </label>
  )
}

export default UpdatableDisplayPicture