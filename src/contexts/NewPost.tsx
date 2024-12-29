import {
  useState,
  createContext,
  type PropsWithChildren,
} from "react"
import type {
  NewPostContextType,
} from "@customTypes/post/new"

export const NewPostContext = createContext<NewPostContextType>({
  files: [],
  caption: "",
  setFiles: (_args: File[]) => {},
  setCaption: (_args: string) => {},
})

function NewPostContextProvider({ children }: PropsWithChildren) {
  const [files, setFiles] = useState<File[]>([])
  const [caption, setCaption] = useState("")

  const contextValues = {
    files,
    caption,
    setFiles,
    setCaption,
  }

  return (
    <NewPostContext value={contextValues}>
      {children}
    </NewPostContext>
  )
}

export default NewPostContextProvider
