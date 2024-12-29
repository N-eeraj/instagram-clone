import {
  useState,
  createContext,
  type PropsWithChildren,
} from "react"
import type {
  NewPostFile,
  NewPostContextType,
} from "@customTypes/post/new"

export const NewPostContext = createContext<NewPostContextType>({
  files: [],
  caption: "",
  previewFileIndex: 0,
  setFiles: (_args: NewPostFile[]) => {},
  setCaption: (_args: string) => {},
  setPreviewFileIndex: (_args: number) => {},
})

function NewPostContextProvider({ children }: PropsWithChildren) {
  const [files, setFiles] = useState<NewPostFile[]>([])
  const [caption, setCaption] = useState("")
  const [previewFileIndex, setPreviewFileIndex] = useState(0)

  const contextValues = {
    files,
    caption,
    previewFileIndex,
    setFiles,
    setCaption,
    setPreviewFileIndex,
  }

  return (
    <NewPostContext value={contextValues}>
      {children}
    </NewPostContext>
  )
}

export default NewPostContextProvider
