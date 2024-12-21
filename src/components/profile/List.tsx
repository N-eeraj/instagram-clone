import clsx from "clsx"

interface ProfileListProp {
  profileList: {
    userName: string
  }[]
  className?: string
}

function ProfileList({ profileList, className }: ProfileListProp) {
  return (
    <ul className={clsx(
      "flex flex-col gap-y-2",
      className,
    )}>
      {profileList.map(({ userName }) => (
        <li key={userName}>
          {userName}
        </li>
      ))}
    </ul>
  )
}

export default ProfileList
