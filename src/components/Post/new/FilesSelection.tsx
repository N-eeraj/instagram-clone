import {
  use,
  type ChangeEvent,
} from "react"
import { NewPostContext } from "@contexts/NewPost"

import { Icon } from "@iconify/react"
import { toast } from "sonner"

import type { PostMediaType } from "@customTypes/post"
import {
  imageExtensions,
  videoExtensions
} from "@/constants"

function FilesSelection() {
  const {
    files,
    setFiles,
  } = use(NewPostContext)

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) return
    if (files.length + target.files.length > 10) {
      return toast.error("You can add only upto 10 files", {
        position: "top-right",
      })
    }
    const filesArray = [...target.files as FileList]
    setFiles([
      ...files,
      ...filesArray.map(file => {
        const isPhoto = imageExtensions.some(extension => file.name.endsWith(extension))

        return {
          file,
          type: (isPhoto ? "photo" : "video") as PostMediaType,
          url: URL.createObjectURL(file),
        }
      })
    ])
    target.value = ""
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, fileIndex) => fileIndex !== index))
  }

  const allowedFiles = [
    ...imageExtensions,
    ...videoExtensions,
  ].join(", ")

  return (
    <ul className="flex items-center gap-x-2 h-16 overflow-x-auto">
      {files.map(({ type, url }, index) => (
        <li
          key={index}
          className="relative h-full aspect-square overflow-hidden">
          {type === "photo" ?
            <img
              key={index}
              src={url}
              alt={url}
              className="size-full object-contain bg-black" /> :
            <video
              key={index}
              src={url}
              className="size-full bg-black" />
          }
          <button
            className="absolute top-0 right-0 bg-black/50 backdrop-blur"
            onClick={() => removeFile(index)}>
            <Icon
              icon="mdi-close" />
          </button>
        </li>
      ))}

      {files.length < 10 && (
        <li className="h-full aspect-square">
          <label className="grid place-content-center size-full bg-black rounded cursor-pointer">
            <Icon
              icon="mdi-plus-circle-outline"
              fontSize={32} />
            <input
              type="file"
              hidden
              multiple
              accept={allowedFiles}
              className="hidden"
              onChange={handleFileChange} />
          </label>
        </li>
      )}
    </ul>
  )
}

export default FilesSelection
