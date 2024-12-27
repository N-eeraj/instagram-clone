import {
  Dispatch,
  SetStateAction,
  ActionDispatch,
} from "react"
import type {
  UserProfile,
} from "@customTypes/user"

type UpdatableFields = "userName" | "fullName" | "bio"

export type FormInputDispatch = { action: UpdatableFields, value: string } | { action: "set", value: Pick<UserProfile, UpdatableFields> }

export interface ProfileEditContextType extends Pick<UserProfile, UpdatableFields> {
  dpFile: File | null
  dpUrl: string | undefined
  isLoading: boolean,
  setDpFile: (_args: File | null) => void
  setDpUrl: (_args: string | undefined) => void
  getInput: (_args: UpdatableFields) => string
  setInput: (_args: FormInputDispatch) => void
  updateProfile: () => void
}

export type FormInputValues = Record<UpdatableFields, string>
