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
  setFiles: (_args: NewPostFile[]) => {},
  setCaption: (_args: string) => {},
})

function NewPostContextProvider({ children }: PropsWithChildren) {
  const [files, setFiles] = useState<NewPostFile[]>([])
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
