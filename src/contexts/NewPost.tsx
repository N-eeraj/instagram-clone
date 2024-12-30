import {
  use,
  useState,
  createContext,
  type PropsWithChildren,
} from "react"

import { newPostSchema } from "@schemas/newPost"
import { createUserPost } from "@firebaseApp/firestore"
import { UserContext } from "@contexts/User"
import { toast } from "sonner"

import type {
  NewPostFile,
  NewPostContextType,
} from "@customTypes/post/new"

export const NewPostContext = createContext<NewPostContextType>({
  files: [],
  caption: "",
  loading: false,
  previewFileIndex: 0,
  setFiles: (_args: NewPostFile[]) => {},
  setCaption: (_args: string) => {},
  setLoading: (_args: boolean) => {},
  setPreviewFileIndex: (_args: number) => {},
  handleCreatePost: () => {},
})

function NewPostContextProvider({ children }: PropsWithChildren) {
  const {
    authUser,
    userProfile,
  } = use(UserContext)
  if (!(authUser && userProfile)) return

  const [files, setFiles] = useState<NewPostFile[]>([])
  const [caption, setCaption] = useState("")
  const [previewFileIndex, setPreviewFileIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleCreatePost = async () => {
    setLoading(true)
    try {
      newPostSchema.parse({ files, caption })
      await createUserPost({
        uid: authUser.uid,
        userName: userProfile.userName,
        files,
        caption,
      })
    } catch(error) {
      if (error instanceof Object && "issues" in error && error.issues instanceof Array) {
        const { message } = error.issues.find(({ message }) => !!message)
        toast.error(message, {
          position: "top-right",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const contextValues = {
    files,
    caption,
    loading,
    previewFileIndex,
    setFiles,
    setCaption,
    setLoading,
    setPreviewFileIndex,
    handleCreatePost,
  }

  return (
    <NewPostContext value={contextValues}>
      {children}
    </NewPostContext>
  )
}

export default NewPostContextProvider
