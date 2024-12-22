import * as z from "zod"

export const userDetailsSchema = z.object({
  userName: z.string(),
  fullName: z.string(),
  followers: z.number(),
  following: z.number(),
  posts: z.number(),
  profilePicture: z.string().optional(),
})
