import {
  Navigate,
  useLoaderData,
} from "react-router-dom"

import { Icon } from "@iconify/react"

function Login() {
  const loaderData = useLoaderData()

  if (loaderData) {
    return (
      <Navigate to="/" />
    )
  }

  return (
    <main className="grid justify-items-center items-center min-h-screen max-lg:py-11 bg-black text-primary-text">
      <article className="flex justify-between w-full max-w-3xl max-lg:h-full">
        <img
          src="/images/login/screen.png"
          alt="instagram-screens"
          className="max-lg:hidden h-[80vh]" />

        <section className="flex flex-col items-center w-full">
          <Icon
            icon="logos:instagram"
            className="text-5xl brightness-0 invert" />
        </section>
      </article>
    </main>
  )
}

export default Login