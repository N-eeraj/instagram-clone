import * as z from "zod"
import type { User } from "firebase/auth"
import { userDetailsSchema } from "@schemas/user"

export type UserDetails = z.infer<typeof userDetailsSchema>

export interface UserContextType {
  authUser: User | null
  userDetails: UserDetails | null
}
