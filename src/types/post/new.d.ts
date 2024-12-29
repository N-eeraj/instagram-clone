import { PostFile } from "@customTypes/post"

export interface NewPostFile extends PostFile {
  file: File
  id: string | number
}

export interface NewPostContextType {
  files: NewPostFile[]
  caption: string
  setFiles: (_args: NewPostFile[]) => void
  setCaption: (_args: string) => void
}
