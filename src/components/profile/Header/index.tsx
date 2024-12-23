import { use } from "react"
import DisplayPicture from "@components/profile/Header/DisplayPicture"
import UserProfileActions from "@components/profile/Header/Actions/User"
import ExternalProfileActions from "@components/profile/Header/Actions/External"
import { ProfileViewContext } from "@contexts/ProfileView"

function ProfileHeader() {
  const {
    profileDetails,
    isUserProfile,
  } = use(ProfileViewContext)
  if (!profileDetails) return

  const { userName, fullName, about, profilePicture, ...details } = profileDetails

  return (
    <header className="grid grid-cols-[105px,auto] md:grid-cols-[290px,auto,minmax(100px,1fr)] grid-rows-[auto,auto,auto,60px] md:grid-rows-[auto,auto,auto] items-center max-w-[935px] mx-auto md:pb-10">
      <div className="grid content-center md:place-items-center row-span-2 md:row-span-3 h-full">
        <DisplayPicture />
      </div>

      <h1 className="w-full md:w-fit pb-3 md:pb-5 md:pr-5 text-xl break-all">
        {userName}
      </h1>

      {/* profile actions */}
      <div className="inline-flex gap-x-2 md:pb-5">
        {isUserProfile ?
          <UserProfileActions /> :
          <ExternalProfileActions />
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
