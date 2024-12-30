import { Icon } from "@iconify/react"
import clsx from "clsx"
import { LikeProps } from "@customTypes/post/ui"

function Likes({ liked, likes, onToggle }: LikeProps) {
  return (
    <div className="flex items-center gap-x-1">
      <Icon
        icon={`material-symbols:favorite${!liked ?  "-outline" : ""}`}
        fontSize={28}
        className={clsx(
          "cursor-pointer",
          liked && "text-red-600",
        )}
        onClick={onToggle} />
      {Boolean(likes) && (
        <span>
          {`Liked by ${likes}`}
        </span>
      )}
    </div>
  )
}

export default Likes
