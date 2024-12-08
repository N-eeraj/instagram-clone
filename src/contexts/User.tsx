import {
  createContext,
  useEffect,
  useState,
} from "react"
import { ChildrenProps } from "@customTypes/common"
import type { User } from "firebase/auth"


interface UserContext {
  user: User | null
  signInUser: Function
  signOutUser: Function
}

export const UserContext = createContext<UserContext>({
  user: null,
  signInUser: (_args: User) => {},
  signOutUser: () => {},
})

function UserContextProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<User | null>(null)

  const signInUser = (userDetails: User) => {
    localStorage.setItem("user", JSON.stringify(userDetails))
    setUser(userDetails)
  }
  const signOutUser = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") ?? "null"))
  }, [])

  const contextValues = {
    user,
    signInUser,
    signOutUser,
  }

  return (
    <UserContext value={contextValues}>
      {children}
    </UserContext>
  )
}

export default UserContextProvider
