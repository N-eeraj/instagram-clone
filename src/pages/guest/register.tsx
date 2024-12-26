import { Link } from "react-router"

import {
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import ControlledInput from "@components/ui/Input/Controlled"
import Button from "@components/ui/Button"
import Error from "@components/ui/Error"

import { Icon } from "@iconify/react"

import { handleSignUp } from "@firebaseApp/auth"
import { registerFormSchema } from "@schemas/auth"
import type { RegisterFormData } from "@customTypes/auth"

function Register() {
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
      await handleSignUp(data)
    } catch(error) {
      if (error instanceof Object && "path" in error && "message" in error) {
        setError(error.path as keyof RegisterFormData, { message: error.message as string })
      } else {
        setError("root", { message: error as string })
      }
    }
  }

  return (
    <main className="grid justify-items-center items-center lg:items-start min-h-screen max-lg:py-11 bg-black text-primary-text">
      <article className="flex justify-between lg:justify-center lg:gap-x-8 w-full max-w-3xl max-lg:h-full lg:mt-16">

        <section className="flex flex-col justify-between lg:justify-start items-center lg:gap-y-2.5 w-full lg:w-[350px] mx-auto lg:mx-0">
          <div className="flex flex-col items-center lg:w-full lg:pb-7 lg:border lg:border-separator-dark lg:px-10">
            <Icon
              icon="logos:instagram"
              className="mx-auto lg:mt-9 text-5xl brightness-0 invert" />

            <strong className="w-72 py-3 text-center text-white/70">
              Sign up to see photos and videos from your friends.
            </strong>

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
                  errors: errors.email,
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
          </div>

          <div className="lg:flex lg:justify-center lg:items-center lg:w-full lg:h-16 text-sm lg:border lg:border-separator-dark">
            <span className="mr-1">
              Have an account?
            </span>
            <Link
              to="/login"
              className="text-primary-button font-semibold">
              Log in
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}

export default Register
