import { use } from "react"
import { ProfileViewContext } from "@contexts/Profile/View"

function ProfilePostsGrid() {
  const { profilePosts } = use(ProfileViewContext)

  return (
    <ul className="grid grid-cols-3">
      {profilePosts.map(({ id, file }) => (
        <li
          key={id}
          className="relative flex items-center aspect-square bg-black overflow-hidden">
          {file.type === "photo" ?
            <img
              src={file.url}
              className="size-full object-contain" /> :
            <video src={file.url}
              className="size-full" />
          }
        </li>
      ))}
    </ul>
  )
}

export default ProfilePostsGrid
