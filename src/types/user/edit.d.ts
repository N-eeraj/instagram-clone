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
  dp: File | null
  setDp: (_args: File | null) => void
  setInput: (_args: FormInputDispatch) => void
}

export type FormInputValues = Record<UpdatableFields, string>
