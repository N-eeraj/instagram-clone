import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { isUsernameTaken } from "@firebaseApp/store"

import {
  LoginFormData,
  RegisterFormData,
} from "@customTypes/auth"

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
      case "auth/network-request-failed":
        throw "Network error! Please check your connection and try again"
      default:
        throw error.message
    }
  }
}

export async function handleSignUp({ email, password, userName }: Pick<RegisterFormData, "email" | "password" | "userName">) {
  try {
    if(await isUsernameTaken(userName)) {
      throw {
        path: "userName",
        message: "This username isn't available. Please try another.",
      }
    }
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
  } catch(error: any) {
    console.error(error.code)
    switch(error.code) {
      case "auth/email-already-in-use":
        throw {
          path: "email",
          message: "Another account is using the same email address.",
        }
      case "auth/too-many-requests":
        throw {
          path: "root",
          message: "Too many requests! Please try again later",
        }
      case "auth/network-request-failed":
        throw {
          path: "root",
          message: "Network error! Please check your connection and try again",
        }
      default:
        throw {
          path: "root",
          message: error.message,
        }
    }
  }
}
