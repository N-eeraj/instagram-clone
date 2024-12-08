import { use } from "react"
import { UserContext } from "@contexts/User"

function Home() {
  const { user } = use(UserContext)
  console.log(user)

  return (
    <div>Home</div>
  )
}

export default Home
