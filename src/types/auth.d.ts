import * as z from "zod"
import { registerFormSchema } from "@schemas/auth"

export interface LoginFormData {
  email: string
  password: string
}

export interface LoginFormProps {
  email?: string | null
  onSubmit: Function
}

export type RegisterFormData = z.infer<typeof registerFormSchema>
