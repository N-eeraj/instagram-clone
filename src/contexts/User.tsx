import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react"
import type { User } from "firebase/auth"
import type { UserDetails } from "@customTypes/user"

type UserContextType = User & UserDetails

interface UserContext {
  user: UserContextType | null
  signInUser: Function
  signOutUser: Function
}

export const UserContext = createContext<UserContext>({
  user: null,
  signInUser: (_args: User) => {},
  signOutUser: () => {},
})

function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserContextType | null>(null)

  const signInUser = (userDetails: UserContextType) => {
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
