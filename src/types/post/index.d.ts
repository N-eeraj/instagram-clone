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

export interface PostFileObject {
  type: PostMediaType
  fileId: string
}

export interface PostObjectType {
  caption: string
  posts: PostFileObject[]
}
