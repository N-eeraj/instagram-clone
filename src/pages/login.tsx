import {
  Link,
  Navigate,
  useLoaderData,
} from "react-router-dom"

import { Controller, SubmitHandler, useForm } from "react-hook-form"

import Input from "@components/ui/Input"
import Button from "@components/ui/Button"

import { Icon } from "@iconify/react"

interface LoginFormData {
  email: string
  password: string
}

function Login() {
  const loaderData = useLoaderData()

  if (loaderData) {
    return (
      <Navigate to="/" />
    )
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLoginSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data)
  }

  return (
    <main className="grid justify-items-center items-center lg:items-start min-h-screen max-lg:py-11 bg-black text-primary-text">
      <article className="flex justify-between lg:justify-center lg:gap-x-8 w-full max-w-3xl max-lg:h-full lg:mt-16">
        <img
          src="/images/login/screen.png"
          alt="instagram-screens"
          className="max-lg:hidden w-96" />

        <section className="flex flex-col justify-between lg:justify-start items-center lg:gap-y-2.5 w-full lg:w-80 mx-auto lg:mx-0">
          <div className="flex flex-col items-center lg:w-full lg:pb-7 lg:border lg:border-separator-dark">
            <Icon
              icon="logos:instagram"
              className="mx-auto lg:mt-9 text-5xl brightness-0 invert" />

            <form
              className="flex flex-col gap-y-2 w-72 lg:w-full pt-7 lg:px-3"
              onSubmit={handleSubmit(handleLoginSubmit)}>

              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Email address"
                    errors={errors.email} />
                )} />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                  minLength: {
                    value: 6,
                    message: "",
                  }
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Password"
                    type="password"
                    errors={errors.password} />
                )} />
                <Button disabled={!isValid}>
                  Login
                </Button>
            </form>
          </div>

          <div className="lg:flex lg:justify-center lg:items-center lg:w-full lg:h-16 text-sm lg:border lg:border-separator-light">
            <span className="mr-1">
              Don't have an account?
            </span>
            <Link
              to="/sign-up"
              className="text-primary-button font-semibold">
              Sign up
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}

export default Login
