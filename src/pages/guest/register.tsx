import { Link } from "react-router"
import RegisterForm from "@components/auth/RegisterForm"

import { handleSignUp } from "@firebaseApp/auth"
import { Icon } from "@iconify/react"

function Register() {

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

            <RegisterForm onSubmit={handleSignUp} />
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
