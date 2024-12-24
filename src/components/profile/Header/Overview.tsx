import { Link } from "react-router"
import { UserProfile } from "@customTypes/user"
import clsx from "clsx"

type ProfileOverviewProps = Pick<UserProfile, "posts" | "followers" | "following"> & {
  className?: string
}

function ProfileOverview({ posts, followers, following, className }: ProfileOverviewProps) {
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
          to="/"
          className="flex flex-col md:flex-row items-center md:gap-x-1">
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
          to="/"
          className="flex flex-col md:flex-row items-center md:gap-x-1">
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
