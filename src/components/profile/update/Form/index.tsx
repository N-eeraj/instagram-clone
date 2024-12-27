import { use } from "react"
import ProfileUpdateInput, {
  type UpdateFormInputProps,
} from "@components/profile/update/Form/Input"
import { ProfileEditContext } from "@contexts/Profile/Edit"

function ProfileUpdateForm() {
  const {
    userName,
    fullName,
    bio,
  } = use(ProfileEditContext)

  const inputFields: UpdateFormInputProps[] = [
    {
      title: "Name",
      value: fullName,
      inputField: "fullName",
      description: "Help people discover your account by using the name you're known by: either your full name, nickname, or business name.",
    },
    {
      title: "Username",
      value: userName,
      inputField:"userName",
      description: "A unique name for your account.",
    },
    {
      title: "Bio",
      value: bio,
      inputField:"bio",
      description: "Provide your personal information, even if the account is used for a business, a pet or something else. This wont't be part of your public profile",
    },
  ]

  return (
    <form className="grid grid-cols-[auto,auto] gap-4 md:gap-x-8">
      {inputFields.map((inputFieldProps) => (
        <ProfileUpdateInput
          key={inputFieldProps.inputField}
          {...inputFieldProps} />
      ))}
    </form>
  )
}

export default ProfileUpdateForm
