import * as z from "zod"

export const userProfileSchema = z.object({
  userName: z.string(),
  fullName: z.string(),
  followers: z.number(),
  following: z.number(),
  posts: z.number(),
  profilePicture: z.string().optional(),
  bio: z.string().optional(),
})

export const userFollowsSchema = z.object({
  following: z.array(z.string()),
  followers: z.array(z.string()),
})
