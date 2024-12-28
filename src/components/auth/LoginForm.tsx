import {
  useForm,
  SubmitHandler,
} from "react-hook-form"

import ControlledInput from "@components/ui/Input/Controlled"
import Button from "@components/ui/Button"
import Error from "@components/ui/Error"
import type {
  LoginFormData,
  LoginFormProps,
} from "@customTypes/auth"

function LoginForm({ email, onSubmit }: LoginFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: email ?? "",
      password: "",
    },
  })

  const handleLoginSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await onSubmit(data)
    } catch(error) {
      setError("root", { message: error as string })
    }
  }

  return (
    <form
      className="flex flex-col gap-y-2 w-72 lg:w-full pt-7 lg:px-3"
      onSubmit={handleSubmit(handleLoginSubmit)}>

      <ControlledInput
        name="email"
        control={control}
        rules={{ required: true }}
        inputProps={{
          type: "email",
          placeholder: "Email address",
          disabled: !!email,
          placeholderLabel: true,
          errors: errors.email
        }} />

      <ControlledInput
        name="password"
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 6,
            message: "",
          }
        }}
        inputProps={{
          type: "password",
          placeholder: "Password",
          placeholderLabel: true,
          errors: errors.password,
        }} />

        <Button
          disabled={!isValid}
          loading={isSubmitting}
          className="mt-2">
          {email ? "Continue" : "Login"}
        </Button>

        <Error errors={errors.root} />
    </form>
  )
}

export default LoginForm
