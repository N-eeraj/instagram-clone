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
    <main className="grid justify-items-center items-center min-h-screen max-lg:py-11 bg-black text-primary-text">
      <article className="flex justify-between w-full max-w-3xl max-lg:h-full">
        <img
          src="/images/login/screen.png"
          alt="instagram-screens"
          className="max-lg:hidden h-[80vh]" />

        <section className="flex flex-col justify-between items-center w-full max-w-72 mx-auto">
          <div>
            <Icon
              icon="logos:instagram"
              className="mx-auto text-5xl brightness-0 invert" />

            <form
              className="flex flex-col gap-y-2 w-72 pt-7"
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

          <div className="pb-2.5 text-sm">
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
