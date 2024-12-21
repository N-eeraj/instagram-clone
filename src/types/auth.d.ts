import * as z from "zod"
import { registerFormSchema } from "@schemas/auth"

export interface LoginFormData {
  email: string
  password: string
}

export type RegisterFormData = z.infer<typeof registerFormSchema>
