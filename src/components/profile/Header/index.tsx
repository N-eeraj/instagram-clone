import { use } from "react"
import UserProfileActions from "@components/profile/Header/Actions/User"
import ExternalProfileActions from "@components/profile/Header/Actions/External"
import { UserContext } from "@contexts/User"

import { Icon } from "@iconify/react"
import clsx from "clsx"
import type { UserProfile } from "@customTypes/user"

function ProfileHeader(profileDetails: UserProfile) {
  const { userName, fullName, about, profilePicture, ...details } = profileDetails
  const { userProfile } = use(UserContext)
  const isUserProfile = userProfile?.userName === userName

  const triggerChangeDp = () => {
    console.log("change dp")
  }

  return (
    <header className="grid grid-cols-[105px,auto] md:grid-cols-[290px,auto,minmax(100px,1fr)] grid-rows-[auto,auto,auto,60px] md:grid-rows-[auto,auto,auto] items-center max-w-[935px] mx-auto md:pb-10">
      <div className="grid content-center md:place-items-center row-span-2 md:row-span-3 h-full">
        {profilePicture ?
          <button
            disabled={!isUserProfile}
            className={clsx(
              "relative w-fit",
              isUserProfile && "cursor-pointer",
            )}
            onClick={triggerChangeDp}>
            <img
              src={profilePicture}
              alt={userName}
              className="size-[77px] md:size-[150px] rounded-full object-cover" />
            {isUserProfile && (
              <Icon
                icon="mdi-plus"
                className="absolute right-0 bottom-0 p-1 bg-primary-button text-xl md:text-3xl rounded-full" />
            )}
          </button> :
          <Icon
            icon="material-symbols:person"
            className="size-[77px] md:size-[150px] p-2 bg-zinc-700 rounded-full" />
        }
      </div>

      <h1 className="w-full md:w-fit pb-3 md:pb-5 md:pr-5 text-xl break-all">
        {userName}
      </h1>

      {/* profile actions */}
      <div className="inline-flex gap-x-2 md:pb-5">
        {isUserProfile ?
          <UserProfileActions /> :
          <ExternalProfileActions
            profileDetails={profileDetails}
            isGuest={!userProfile} />
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
