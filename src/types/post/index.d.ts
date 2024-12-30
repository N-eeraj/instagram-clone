export type PostMediaType = "photo" | "video"

export interface PostFile {
  type: PostMediaType
  url: string
}

export interface PostType {
  userName: string
  files: PostFile[]
  caption: string
  id: string
}
