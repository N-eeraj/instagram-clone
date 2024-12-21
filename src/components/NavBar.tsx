import { Link } from "react-router"
import { Icon } from "@iconify/react"

function NavBar() {
  return (
    <nav className="sticky top-0 pt-3 pb-2 bg-zinc-900 z-20">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/">
          <Icon
            icon="logos:instagram"
            fontSize={32}
            className="invert" />
        </Link>

        <Link to="/profile">
          <Icon
            icon="mdi-account-outline"
            fontSize={24}
            className="fill-red-400" />
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
