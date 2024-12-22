import { use } from "react"
import {
  Link,
  useLocation,
} from "react-router"
import Search from "@components/NavBar/Search"
import { UserContext } from "@contexts/User"
import { Icon } from "@iconify/react"

function NavBar() {
  const { userDetails } = use(UserContext)
  const { pathname } = useLocation()
  const isHomePage = pathname === "/"
  const isProfilePage = pathname === "/profile"
  

  return (
    <nav className="sticky top-0 pt-4 pb-2 px-4 bg-secondary md:bg-zinc-900 z-20">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <Link to="/">
          <Icon
            icon="logos:instagram"
            fontSize={32}
            className="invert" />
        </Link>

        <div className="fixed md:relative flex justify-between items-center left-0 bottom-0 w-full md:w-1/2 px-12 py-3 md:p-0 bg-zinc-900">
          <Link
            to="/"
            className="md:hidden">
            <Icon
              icon={`material-symbols:home${!isHomePage ? "-outline" : ""}-rounded`}
              className="text-4xl md:text-3xl" />
          </Link>

          <Search />

          <Link to="/profile">
            {userDetails?.profilePicture ?
              <img
                src="/favicon.png"
                alt="profile-picture"
                className="size-9 md:size-[30px] rounded-full" /> :
              <Icon
                icon={`ic:${isProfilePage ? "baseline" : "outline"}-account-circle`}
                className="text-4xl md:text-3xl" />
            }
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
