import { use } from "react"
import { ProfileViewContext } from "@contexts/Profile/View"
import { Icon } from "@iconify/react"
import { Link } from "react-router"

function ProfilePostsGrid() {
  const {
    profileDetails,
    profilePosts,
  } = use(ProfileViewContext)

  if (!profilePosts.length) {
    return (
      <>
        <span className="block w-full mt-4 text-xl text-center opacity-75">
          No Posts
        </span>
      </>
    )
  }

  return (
    <ul className="grid grid-cols-3">
      {profilePosts.map(({ id, file }) => (
        <li
          key={id}
          className="relative flex items-center aspect-square bg-black overflow-hidden">
          <Link
            to={`/${profileDetails?.userName}/${id}`}
            className="size-full">
            {file.type === "photo" ?
              <img
                src={file.url}
                className="size-full object-contain" /> :
              <video src={file.url}
                className="size-full" />
            }

            {file.hasMultiFiles && (
              <Icon
                icon="mdi:checkbox-multiple-blank"
                fontSize={24}
                className="absolute top-2 right-2" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ProfilePostsGrid
