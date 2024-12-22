export interface UserDetails {
  followers: number
  following: number
  fullName: string
  posts: number
  uid: string
  userName: string
  profilePicture?: string
}

export interface UserContextType {
  authUser: User | null
  userDetails: UserDetails | null
}
