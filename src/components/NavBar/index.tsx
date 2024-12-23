import type { PropsWithChildren } from "react"
import { Link } from "react-router"
import { Icon } from "@iconify/react"

function NavBar({ children }: PropsWithChildren) {
  return (
    <nav className="sticky top-0 pt-4 pb-2 px-4 bg-secondary border-b border-b-separator-light z-20">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/">
          <Icon
            icon="logos:instagram"
            fontSize={32}
            className="invert" />
        </Link>

        {children}
      </div>
    </nav>
  )
}

export default NavBar
