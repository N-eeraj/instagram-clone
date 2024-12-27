import {
  use,
  type ChangeEvent,
} from "react"

import Input from "@components/ui/Input"
import { ProfileEditContext } from "@contexts/Profile/Edit"
import type { UpdatableFields } from "@customTypes/user/edit"

export interface UpdateFormInputProps {
  title: string
  value: string | undefined
  inputField: UpdatableFields
  description?: string
}

function ProfileUpdateInput({ title, value, inputField, description }: UpdateFormInputProps) {
  const { setInput } = use(ProfileEditContext)

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
          value={value}
          className="w-full"
          onChange={handleChange} />
        <p className="hidden md:block">
          {description}
        </p>
      </div>
    </>
  )
}

export default ProfileUpdateInput
