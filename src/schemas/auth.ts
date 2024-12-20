import * as z from "zod"

export const registerFormSchema = z.object({
  email: z.string()
    .min(1, "This field is required")
    .email("Enter a valid email address."),
  password: z.string()
    .min(6, "Create a password that is at least 6 characters in length."),
  fullName: z.string()
    .min(1, "This field is required"),
  userName: z.string()
    .min(1, "This field is required")
    .regex(/^[a-zA-Z0-9_.]+$/, "Usernames can only include letters, numbers, underscores and full stops.")
    .refine((val) => !/^\d+$/.test(val), {
      message: "Your username cannot contain only numbers.",
    }),
})
