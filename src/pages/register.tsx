import { use } from "react"

import {
  Link,
  useNavigate,
} from "react-router"

import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Input from "@components/ui/Input"
import Button from "@components/ui/Button"
import Error from "@components/ui/Error"

import { UserContext } from "@contexts/User"
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

  const { signInUser } = use(UserContext)
  const navigate = useNavigate()

  const handleRegisterSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const user = await handleSignUp(data)
      const { password, ...userData } = data
      signInUser({
        ...userData,
        followers: 0,
        following: 0,
        posts: 0,
        ...user,
      })
      navigate("/")
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

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Email address"
                    errors={errors.email}
                    showValidityIcon />
                )} />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    errors={errors.password}
                    showValidityIcon />
                )} />

                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Full Name"
                      errors={errors.fullName}
                      showValidityIcon />
                  )} />
  
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Username"
                      errors={errors.userName}
                      showValidityIcon />
                  )} />

                {errors.root && <Error errors={errors.root} />}

                <Button
                  disabled={!isValid}
                  loading={isSubmitting}>
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
