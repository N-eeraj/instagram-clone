import Button from "@components/ui/Button"

function ProfileHeader() {
  return (
    <header className="grid grid-cols-[105px,auto] md:grid-cols-[290px,auto,minmax(100px,1fr)] grid-rows-[auto,auto,auto,60px] md:grid-rows-[auto,auto,auto] items-center max-w-[935px] mx-auto md:pb-10">
      <div className="grid content-center md:place-items-center row-span-2 md:row-span-3  h-full">
        <img
          src={"/favicon.png"}
          alt={"profileName"}
          className="size-[77px] md:size-[150px] rounded-full" />
      </div>
      <h1 className="w-full md:w-fit pb-3 md:pb-5 md:pr-5 text-xl break-all">
        {"user_name"}
      </h1>
      <div className="inline-flex gap-x-1 md:pb-5">
        <Button className="flex-1 md:grow-0">
          Follow
        </Button>
      </div>
      <div className="col-span-2 md:order-1 pb-5 md:pb-0 break-all">
        <h1 className="font-semibold">
          {"Full Name"}
        </h1>
        <p>
          {"About"}
        </p>
      </div>
      <div className="col-span-2 md:self-start h-full md:h-10">
        hi
      </div>
    </header>
  )
}

export default ProfileHeader
