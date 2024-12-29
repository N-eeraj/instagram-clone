export type PostMediaType = "photo" | "video"

export interface PostFile {
  type: PostMediaType
  url: string
}
