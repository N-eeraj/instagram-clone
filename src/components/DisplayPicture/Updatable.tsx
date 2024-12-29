import {
  useId,
  useState,
  type ChangeEvent,
} from "react"

import DisplayPicture from "@components/DisplayPicture"
import { Icon } from "@iconify/react"
import type { DisplayPictureType } from "@customTypes/user"
import clsx from "clsx"
import { imageExtensions } from "@/constants"

type DisplayPictureProps = DisplayPictureType & {
  loading?: boolean
  className?: string
  onChange: (_file:  File, _url: string) => any
}

function UpdatableDisplayPicture({ displayPicture, userName, loading, className, onChange }: DisplayPictureProps) {
  const inputId = useId()
  const [tempDp, setTempDp] = useState<string | null>(null)

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const files = target.files
    if (files && files.length) {
      const file = files[0]
      const tempUrl = URL.createObjectURL(file)
      setTempDp(tempUrl)
      onChange(file, tempUrl)
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
        disabled={loading}
        accept={imageExtensions.join(", ")}
        className="hidden"
        onChange={handleFileChange} />

      <DisplayPicture
        displayPicture={(loading && tempDp) ? tempDp : displayPicture}
        userName={userName}
        className={clsx(
          className,
          loading && "brightness-50",
        )} />

      {!displayPicture && (
        <Icon
          icon="mdi-plus"
          className="absolute right-0 bottom-0 p-1 bg-primary-button text-xl md:text-3xl rounded-full" />
      )}
    </label>
  )
}

export default UpdatableDisplayPicture