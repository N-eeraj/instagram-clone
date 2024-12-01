import { useContext } from "react"
import { UserContext } from "@/contexts/User"

function Home() {
  const { user } = useContext(UserContext)
  console.log(user)

  return (
    <div>Home</div>
  )
}

export default Home
