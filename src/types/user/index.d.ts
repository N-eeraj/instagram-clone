import * as z from "zod"
import { userProfileSchema } from "@schemas/user"
import type { User } from "firebase/auth"
import type { PostListItemType } from "@customTypes/post"

export type UserProfile = z.infer<typeof userProfileSchema> & {
  displayPicture?: string
  uid?: string
}

export interface UserContextType {
  authUser: User | null
  userProfile: UserProfile | null
  setUserProfile: (_args: UserProfile | null) => void
}

export interface ProfileViewContextType {
  profileDetails: UserProfile | null
  isUserProfile: boolean
  isGuest: boolean
  profilePosts: PostListItemType[]
  setProfileDetails: (_args: UserProfile | null) => void
}

export type DisplayPictureType = Pick<UserProfile, "userName" | "displayPicture">

export type UpdateProfileArgs = Partial<Pick<UserProfile, "userName" | "fullName" | "bio">> & Pick<User, "uid">
