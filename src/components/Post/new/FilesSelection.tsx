import {
  use,
  useRef,
  useMemo,
  useState,
  useEffect,
  type ChangeEvent,
} from "react"
import { NewPostContext } from "@contexts/NewPost"

import {
  createSwapy,
  utils,
  type Swapy,
  type SlotItemMapArray,
} from "swapy"
import { Icon } from "@iconify/react"
import { toast } from "sonner"

import type { PostMediaType } from "@customTypes/post"
import type { NewPostFile } from "@customTypes/post/new"
import {
  imageExtensions,
  videoExtensions
} from "@/constants"

function FilesSelection() {
  const {
    files,
    setFiles,
    setPreviewFileIndex,
  } = use(NewPostContext)

  const containerRef = useRef<HTMLUListElement>(null)
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(utils.initSlotItemMap(files, "id"))
  const slottedItems = useMemo(() => utils.toSlottedItems(files, "id", slotItemMap), [files, slotItemMap])
  const swapyRef = useRef<Swapy | null>(null)

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
          id: crypto.randomUUID(),
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

  useEffect(() => {
    swapyRef.current?.onSwapEnd(({ slotItemMap }) => {
      const swappedArray = slotItemMap.asArray
      setFiles(swappedArray.map(({ item }) => files.find(({ id }) => item === id) as NewPostFile))
    })
    utils.dynamicSwapy(swapyRef.current, files, "id", slotItemMap, setSlotItemMap)
  }, [files])

  useEffect(() => {
    swapyRef.current = createSwapy(containerRef.current!, {
      manualSwap: true,
      animation: "spring",
      autoScrollOnDrag: true,
    })

    swapyRef.current.onSwap(({ newSlotItemMap }) => {
      setSlotItemMap(newSlotItemMap.asArray)
    })

    return () => {
      swapyRef.current?.destroy()
    }
  }, [])

  return (
    <ul
      ref={containerRef}
      className="flex items-center flex-wrap md:flex-nowrap gap-2 overflow-x-auto">
      {slottedItems.map(({ slotId, itemId, item }, index) => (
        <li
          data-swapy-slot={slotId}
          key={slotId}
          className="relative shrink-0 h-16 aspect-square bg-black overflow-hidden">
          {item && (
            <div
              data-swapy-item={itemId}
              key={itemId}
              className="size-full cursor-pointer"
              onClick={() => setPreviewFileIndex(index)}>
              {item.type === "photo" ?
                <img
                  src={item.url}
                  alt={item.url}
                  className="size-full object-contain object-center" /> :
                <video
                  src={item.url}
                  className="size-full" />
              }
              <button
                className="absolute top-0 right-0 bg-black/50 backdrop-blur"
                onClick={() => removeFile(index)}>
                <Icon
                  icon="mdi-close" />
              </button>
            </div>
          )}
        </li>
      ))}

      {files.length < 10 && (
        <li>
          <label className="grid place-content-center h-16 aspect-square bg-black rounded cursor-pointer">
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
