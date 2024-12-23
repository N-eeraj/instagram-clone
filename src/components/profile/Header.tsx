import { use } from "react"
import Button from "@components/ui/Button"
import { UserContext } from "@contexts/User"
import type { UserProfile } from "@customTypes/user"

function ProfileHeader({ userName, fullName, about, profilePicture, ...details }: UserProfile) {
  const { userProfile } = use(UserContext)
  const isUserProfile = userProfile?.userName === userName

  return (
    <header className="grid grid-cols-[105px,auto] md:grid-cols-[290px,auto,minmax(100px,1fr)] grid-rows-[auto,auto,auto,60px] md:grid-rows-[auto,auto,auto] items-center max-w-[935px] mx-auto md:pb-10">
      <div className="grid content-center md:place-items-center row-span-2 md:row-span-3  h-full">
        <img
          src={profilePicture}
          alt={userName}
          className="size-[77px] md:size-[150px] rounded-full object-cover" />
      </div>
      <h1 className="w-full md:w-fit pb-3 md:pb-5 md:pr-5 text-xl break-all">
        {userName}
      </h1>
      <div className="inline-flex gap-x-1 md:pb-5">
        {isUserProfile ?
          <Button
            disabled={!userProfile}
            grayOnDisable
            className="w-full md:w-fit">
            Edit Profile
          </Button> :
          <>
            <Button
              disabled={!userProfile}
              grayOnDisable
              className="flex-1 md:grow-0">
              Follow
            </Button>
          </>
        }
      </div>
      <div className="col-span-2 md:order-1 pb-5 md:pb-0 break-all">
        <h1 className="font-semibold">
          {fullName}
        </h1>
        <p>
          {about}
        </p>
      </div>
      <div className="col-span-2 md:self-start h-full md:h-10">
        {JSON.stringify(details)}
      </div>
    </header>
  )
}

export default ProfileHeader
