import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"

import { LoginFormData } from "@customTypes/auth"

const auth = getAuth()

export async function handleSignIn({ email, password }: LoginFormData) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch(error: any) {
    console.error(error.code)
    switch(error.code) {
      case "auth/invalid-email":
        throw "Invalid email"
      case "auth/invalid-credential":
        throw "Invalid credentials! Please check your email & password"
      case "auth/too-many-requests":
        throw "Too many requests! Please try again later"
      default:
        throw error.message
    }
  }
}
