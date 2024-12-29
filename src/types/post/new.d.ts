import { z } from "zod"
import { newPostSchema } from "@schemas/newPost"

export type NewPostContextType = z.infer<typeof newPostSchema> & {
  setFiles: (_args: File[]) => void
  setCaption: (_args: string) => void
}
