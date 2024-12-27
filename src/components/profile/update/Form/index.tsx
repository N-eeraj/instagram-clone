import ProfileUpdateInput, {
  type UpdateFormInputProps,
} from "@components/profile/update/Form/Input"

function ProfileUpdateForm() {
  const inputFields: UpdateFormInputProps[] = [
    {
      title: "Name",
      inputField: "fullName",
      description: "Help people discover your account by using the name you're known by: either your full name, nickname, or business name.",
    },
    {
      title: "Username",
      inputField:"userName",
      description: "A unique name for your account.",
    },
    {
      title: "Bio",
      inputField:"bio",
      description: "Provide your personal information, even if the account is used for a business, a pet or something else. This wont't be part of your public profile.",
    },
    {
      title: "Password",
      type: "password",
      inputField:"password",
      description: "Use a secure password.",
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
