import {
  useForm,
  SubmitHandler,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import ControlledInput from "@components/ui/Input/Controlled"
import Button from "@components/ui/Button"
import Error from "@components/ui/Error"

import { registerFormSchema } from "@schemas/auth"
import type { RegisterFormData } from "@customTypes/auth"

function RegisterForm({ onSubmit }: { onSubmit: Function }) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      userName: "",
    },
    resolver: zodResolver(registerFormSchema)
  })
  
  const handleRegisterSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await onSubmit(data)
    } catch(error) {
      if (error instanceof Object && "path" in error && "message" in error) {
        setError(error.path as keyof RegisterFormData, { message: error.message as string })
      } else {
        setError("root", { message: error as string })
      }
    }
  }

  return (
    <form
      className="flex flex-col gap-y-2 w-72 lg:w-full lg:px-3 py-4"
      onSubmit={handleSubmit(handleRegisterSubmit)}>

      <ControlledInput
        name="email"
        control={control}
        inputProps={{
          type: "email",
          placeholder: "Email address",
          placeholderLabel: true,
          errors: errors.email,
          showValidityIcon: true,
        }} />

      <ControlledInput
        name="password"
        control={control}
        inputProps={{
          type: "password",
          placeholder: "Password",
          placeholderLabel: true,
          errors: errors.password,
          showValidityIcon: true,
        }} />

      <ControlledInput
        name="fullName"
        control={control}
        inputProps={{
          placeholder: "Full Name",
          placeholderLabel: true,
          errors: errors.fullName,
          showValidityIcon: true,
        }} />

      <ControlledInput
        name="userName"
        control={control}
        inputProps={{
          placeholder: "Username",
          placeholderLabel: true,
          errors: errors.userName,
          showValidityIcon: true,
        }} />

        {errors.root && <Error errors={errors.root} />}

        <Button
          disabled={!isValid}
          loading={isSubmitting}
          className="mt-2">
          Sign Up
        </Button>
    </form>
  )
}

export default RegisterForm
