import {
  use,
  useState,
  useEffect,
  useReducer,
  createContext,
  PropsWithChildren,
} from "react"

import { UserContext } from "@contexts/User"
import useUpdateDp from "@hooks/useUpdateDp"
import removeFile from "@appwriteStorage/delete"
import {
  deleteDP,
  updateUserProfile,
} from "@firebaseApp/store"

import type {
  FormInputValues,
  FormInputDispatch,
  ProfileEditContextType,
  UpdatableFields,
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
  dpFile: null,
  dpUrl: undefined,
  isLoading: false,
  ...formInitialValue,
  setDpFile: (_args: File | null) => {},
  setDpUrl: (_args: string | undefined) => {},
  getInput: (_args: UpdatableFields) => "",
  setInput: (_args: FormInputDispatch) => {},
  updateProfile: () => {},
})

function ProfileEditContextProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false)
  const [dpFile, setDpFile] = useState<File | null>(null)
  const [dpUrl, setDpUrl] = useState<string | undefined>(undefined)
  const [formState, formDispatch] = useReducer(formInputReducer, formInitialValue)

  const {
    authUser,
    userProfile,
    setUserProfile,
  } = use(UserContext)
  if (!(authUser && userProfile)) return

  const { updateDpHandler } = useUpdateDp()

  const getInput = (field: UpdatableFields) => formState[field] ?? ""

  const handleFormUpdate = async () => {
    const formData: Partial<FormInputValues> = {...formState}
    if (userProfile.userName === formState.userName) {
      delete formData.userName
    }
    await updateUserProfile({
      uid: authUser.uid,
      ...formData,
    })
    setUserProfile({
      ...userProfile,
      ...formData,
    })
  }

  const handleFileRemoval = async () => {
    if (userProfile.profilePicture && userProfile?.displayPicture !== dpUrl) {
      await deleteDP(authUser.uid)
      await removeFile(userProfile.profilePicture)
    }
  }

  const handleFileUpdate = async () => {
    if (dpFile) {
      await updateDpHandler!(dpFile)
    }
  }

  const updateProfile = async () => {
    setIsLoading(true)
    try {
      await handleFormUpdate()
      // await handleFileRemoval()
      // await handleFileUpdate()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userProfile) {
      formDispatch({
        action: "set",
        value: userProfile,
      })
      setDpUrl(userProfile.displayPicture)
    }
  }, [userProfile])

  const contextValues = {
    dpFile,
    dpUrl,
    isLoading,
    ...formState,
    setDpUrl,
    setDpFile,
    getInput,
    setInput: formDispatch,
    updateProfile,
  }

  return (
    <ProfileEditContext value={contextValues}>
      {children}
    </ProfileEditContext>
  )
}

export default ProfileEditContextProvider
