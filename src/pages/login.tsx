import { FormEvent } from "react"
import {
  Link,
  Navigate,
  useLoaderData,
} from "react-router-dom"

import { Icon } from "@iconify/react"

import Input from "@components/ui/Input"

function Login() {
  const loaderData = useLoaderData()

  if (loaderData) {
    return (
      <Navigate to="/" />
    )
  }

  const handleLoginSubmit = (event: FormEvent) => {
    event.preventDefault()
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
              onSubmit={handleLoginSubmit}>
              <Input
                placeholder="Email address"
                name="email" />
              <Input
                placeholder="Password"
                type="password"
                name="password" />
              <button className="h-8 mt-2 bg-primary-button rounded-lg">
                Log in
              </button>
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
