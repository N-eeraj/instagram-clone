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
  isUsernameTaken,
  updateUserProfile,
} from "@firebaseApp/store"
import { handlePasswordUpdate } from "@firebaseApp/auth"
import { toast } from "sonner"

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
  password: "",
}

const formInputReducer = (state: FormInputValues, { action, value }: FormInputDispatch): FormInputValues => {
  switch (action) {
    case "bio":
    case "fullName":
    case "userName":
    case "password":
      return {
        ...state,
        [action]: value
      }
    case "set":
      return {
        bio: value.bio ?? "",
        fullName: value.fullName,
        userName: value.userName,
        password: "",
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
  reAuthenticate: false,
  setDpFile: (_args: File | null) => {},
  setDpUrl: (_args: string | undefined) => {},
  getInput: (_args: UpdatableFields) => "",
  setInput: (_args: FormInputDispatch) => {},
  updateProfile: () => {},
  setReAuthenticate: (_args: boolean) => {},
})

function ProfileEditContextProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false)
  const [dpFile, setDpFile] = useState<File | null>(null)
  const [dpUrl, setDpUrl] = useState<string | undefined>(undefined)
  const [reAuthenticate, setReAuthenticate] = useState(false)
  const [formState, formDispatch] = useReducer(formInputReducer, formInitialValue)

  const {
    authUser,
    userProfile,
    setUserProfile,
  } = use(UserContext)
  if (!(authUser && userProfile)) return

  const { updateDpHandler } = useUpdateDp()

  const getInput = (field: UpdatableFields) => formState[field] ?? ""

  const checkUserNameTaken = async (userName: string) => {
    const userNameExists = await isUsernameTaken(userName)
    if (userNameExists) {
      throw "This username isn't available. Please try another."
    }
  }

  const handleUpdatePassword = async (password: string) => {
    try {
      if (!password) return
      if (password.length < 6) {
        throw "Create a password that is at least 6 characters in length."
      }
      await handlePasswordUpdate(password)
    } catch (error) {
      if (error instanceof Object && "code" in error) {
        console.error(error.code)
        if (error.code === "auth/requires-recent-login") {
          await new Promise(() => {
            setReAuthenticate(true)
          })
        } else {
          throw "Something went wrong."
        }
      }
    }
  }

  const handleFormUpdate = async () => {
    const { password, ...formData }: Partial<FormInputValues> = {...formState}
    if (userProfile.userName === formState.userName) {
      delete formData.userName
    } else if (formData.userName) {
      await checkUserNameTaken(formData.userName)
    }
    await handleUpdatePassword(password)
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
      await handleFileRemoval()
      await handleFileUpdate()
      toast.success("Updated Profile")
    } catch (error) {
      toast.error(error as string)
      throw error
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

  useEffect(() => {
    if (!reAuthenticate) {
      setIsLoading(false)
    }
  }, [reAuthenticate])

  const contextValues = {
    dpFile,
    dpUrl,
    isLoading,
    ...formState,
    reAuthenticate,
    setDpUrl,
    setDpFile,
    getInput,
    setInput: formDispatch,
    updateProfile,
    setReAuthenticate,
  }

  return (
    <ProfileEditContext value={contextValues}>
      {children}
    </ProfileEditContext>
  )
}

export default ProfileEditContextProvider
