import {
  Link,
  useNavigate,
} from "react-router"

import {
  Controller,
  SubmitHandler,
  useForm,
} from "react-hook-form"

import Input from "@components/ui/Input"
import Button from "@components/ui/Button"
import Error from "@components/ui/Error"

import { Icon } from "@iconify/react"
import { RegisterFormData } from "@customTypes/auth"

function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      userName: "",
    },
  })

  const navigate = useNavigate()

  const handleRegisterSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      console.log(data)
      // navigate("/")
    } catch(error) {
      setError("root", { message: error as string })
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

                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Full Name"
                      errors={errors.email} />
                  )} />
  
                <Controller
                  name="userName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Username"
                      errors={errors.email} />
                  )} />

                <Button
                  disabled={!isValid}
                  loading={isSubmitting}>
                  Sign Up
                </Button>

                <Error errors={errors.root} />
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
