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

import Input from "@components/ui/Input"
import Button from "@components/ui/Button"
import Error from "@components/ui/Error"
import { UserContext } from "@contexts/User"

import { handleSignIn } from "@firebaseApp/auth"
import { Icon } from "@iconify/react"
import { LoginFormData } from "@customTypes/auth"


function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  const { signInUser } = use(UserContext)

  const handleLoginSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const user = await handleSignIn(data)
      signInUser(user)
      navigate("/")
    } catch(error) {
      setError("root", { message: error as string })
    }
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

                <Button
                  disabled={!isValid}
                  loading={isSubmitting}>
                  Login
                </Button>

                <Error errors={errors.root} />
            </form>
          </div>

          <div className="lg:flex lg:justify-center lg:items-center lg:w-full lg:h-16 text-sm lg:border lg:border-separator-dark">
            <span className="mr-1">
              Don't have an account?
            </span>
            <Link
              to="/register"
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
