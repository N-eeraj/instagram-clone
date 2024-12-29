import { z } from "zod"
import {
  newPostSchema,
  fileObjectSchema,
} from "@schemas/newPost"

export interface NewPostContextType extends z.infer<typeof newPostSchema> {
  files: PostFile[]
  setFiles: (_args: File[]) => void
  setCaption: (_args: string) => void
}
