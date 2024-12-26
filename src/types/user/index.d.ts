import * as z from "zod"
import type { User } from "firebase/auth"
import { userProfileSchema } from "@schemas/user"

export type UserProfile = z.infer<typeof userProfileSchema> & {
  displayPicture?: string
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
  setProfileDetails: (_args: UserProfile | null) => void
}

export type DisplayPictureType = Pick<UserProfile, "userName" | "displayPicture">
