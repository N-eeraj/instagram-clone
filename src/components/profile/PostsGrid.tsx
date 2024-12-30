import { use } from "react"
import { ProfileViewContext } from "@contexts/Profile/View"

function ProfilePostsGrid() {
  const { profilePosts } = use(ProfileViewContext)

  return (
    <ul className="grid grid-cols-3">
      {profilePosts.map(({ id, files }) => (
        <li
          key={id}
          className="relative flex items-center aspect-square bg-black overflow-hidden">
          {files[0].type === "photo" ?
            <img
              src={files[0].url} /> :
            <video src={files[0].url} />
          }
        </li>
      ))}
    </ul>
  )
}

export default ProfilePostsGrid
