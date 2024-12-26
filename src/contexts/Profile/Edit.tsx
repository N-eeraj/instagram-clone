import {
  use,
  useState,
  useEffect,
  useReducer,
  createContext,
  PropsWithChildren,
} from "react"

import { UserContext } from "@contexts/User"
import type {
  UpdatableFields,
  FormInputValues,
  FormInputDispatch,
  ProfileEditContextType,
} from "@customTypes/user/edit"

const formInitialValue: FormInputValues = {
  fullName: "",
  userName: "",
  bio: "",
}

const formInputReducer = (state: FormInputValues, { action, value }: FormInputDispatch): FormInputValues => {
  switch (action) {
    case "bio":
    case "fullName":
    case "userName":
      return {
        ...state,
        [action]: value
      }
    case "set":
      return {
        bio: value.bio ?? "",
        fullName: value.fullName,
        userName: value.userName,
      }
    default:
      console.warn(`Invalid action: ${action}`)
      return state
  }
}

export const ProfileEditContext = createContext<ProfileEditContextType>({
  dp: null,
  ...formInitialValue,
  setDp: (_args: File | null) => {},
  setInput: (_args: FormInputDispatch) => {},
})

function ProfileEditContextProvider({ children }: PropsWithChildren) {
  const [dp, setDp] = useState<File | null>(null)
  const [formState, formDispatch] = useReducer(formInputReducer, formInitialValue)

  const { userProfile } = use(UserContext)

  useEffect(() => {
    if (userProfile) {
      formDispatch({
        action: "set",
        value: userProfile,
      })
    }
  }, [userProfile])

  const contextValues = {
    dp,
    setDp,
    ...formState,
    setInput: formDispatch,
  }

  return (
    <ProfileEditContext value={contextValues}>
      {children}
    </ProfileEditContext>
  )
}

export default ProfileEditContextProvider
