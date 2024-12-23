import { use } from "react"
import {
  Link,
  useLocation,
} from "react-router"

import NavBar from "@components/NavBar"
import Search from "@components/NavBar/Search"
import { UserContext } from "@contexts/User"
import { Icon } from "@iconify/react"

function AuthNavBar() {
  const { userDetails } = use(UserContext)
  if (!userDetails) return

  const { pathname } = useLocation()
  const isHomePage = pathname === "/"
  const isProfilePage = pathname === "/profile"

  return (
    <NavBar>
      <div className="fixed md:relative flex justify-between items-center left-0 bottom-0 w-full md:w-1/2 px-12 py-3 md:p-0 bg-zinc-900">
        <Link
          to="/"
          className="md:hidden">
          <Icon
            icon={`material-symbols:home${!isHomePage ? "-outline" : ""}-rounded`}
            className="text-4xl md:text-3xl" />
        </Link>

        <Search />

        <Link to={userDetails?.userName}>
          {userDetails?.profilePicture ?
            <img
              src={userDetails.profilePicture}
              alt="profile-picture"
              className="size-9 md:size-[30px] rounded-full object-cover" /> :
            <Icon
              icon={`ic:${isProfilePage ? "baseline" : "outline"}-account-circle`}
              className="text-4xl md:text-3xl" />
          }
        </Link>
      </div>
    </NavBar>
  )
}

export default AuthNavBar
