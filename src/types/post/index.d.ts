export type PostMediaType = "photo" | "video"

export interface PostFile {
  type: PostMediaType
  url: string
}

export interface PostType {
  id: string
  userName: string
  files: PostFile[]
  caption: string
  likes: string[]
}

export interface PostListItemType {
  caption: string
  file: {
    type: PostMediaType
    url: string
    hasMultiFiles: boolean
  }
  id: string
}

export interface PostFileObject {
  type: PostMediaType
  fileId: string
}

export interface PostObjectType {
  caption: string
  files: PostFileObject[]
}

export interface PostLikeToggle {
  id: string
  liked: boolean
  uid: string
}
