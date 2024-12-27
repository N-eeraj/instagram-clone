import {
  use,
  type HTMLInputTypeAttribute,
  type ChangeEvent,
} from "react"

import Input from "@components/ui/Input"
import { ProfileEditContext } from "@contexts/Profile/Edit"
import type { UpdatableFields } from "@customTypes/user/edit"

export interface UpdateFormInputProps {
  title: string
  type?: HTMLInputTypeAttribute
  inputField: UpdatableFields
  description?: string
}

function ProfileUpdateInput({ title, type, inputField, description }: UpdateFormInputProps) {
  const {
    getInput,
    setInput,
  } = use(ProfileEditContext)

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInput({
      action: inputField,
      value: target.value,
    })
  }

  return (
    <>
      <strong className="">
        {title}
      </strong>
      <div className="flex-1 flex flex-col gap-y-2">
        <Input
          type={type}
          value={getInput(inputField)}
          className="w-full"
          onChange={handleChange} />
        <p className="hidden md:block text-sm">
          {description}
        </p>
      </div>
    </>
  )
}

export default ProfileUpdateInput
