import { use } from "react"
import { Link } from "react-router"
import { ProfileViewContext } from "@contexts/ProfileView"
import clsx from "clsx"

function ProfileOverview({ className }: { className?: string }) {
  const {
    profileDetails,
    isGuest,
  } = use(ProfileViewContext)
  if (!profileDetails) return

  const {
    userName,
    posts,
    followers,
    following,
  } = profileDetails

  return (
    <ul className={clsx(
      "relative flex justify-around md:justify-start items-center md:gap-x-10",
      "md:before:hidden before:absolute before:top-0 before:-left-4 before:w-screen before:h-px before:bg-separator-dark",
      "md:after:hidden after:absolute after:bottom-0 after:-left-4 after:w-screen after:h-px after:bg-separator-dark",
      className,
    )}>
      <li>
        <div className="flex flex-col md:flex-row items-center md:gap-x-1">
          <strong className="text-white">
            {posts}
          </strong>
          <span className="opacity-80">
            posts
          </span>
        </div>
      </li>
      <li>
        <Link
          to={`/${userName}/followers`}
          className="flex flex-col md:flex-row items-center md:gap-x-1"
          onClick={e => isGuest && e.preventDefault()}>
          <strong className="text-white">
            {followers}
          </strong>
          <span className="opacity-80">
            followers
          </span>
        </Link>
      </li>
      <li>
        <Link
          to={`/${userName}/following`}
          className="flex flex-col md:flex-row items-center md:gap-x-1"
          onClick={e => isGuest && e.preventDefault()}>
          <strong className="text-white">
            {following}
          </strong>
          <span className="opacity-80">
            following
          </span>
        </Link>
      </li>
    </ul>
  )
}

export default ProfileOverview
