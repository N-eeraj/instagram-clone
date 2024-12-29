enum MediaType {
  PHOTO = "photo",
  VIDEO = "video",
}

export interface PostFile {
  type: MediaType
  url: string
}
