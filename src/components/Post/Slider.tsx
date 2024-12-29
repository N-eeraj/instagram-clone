import { useState } from "react"
import clsx from "clsx"
import { PostFile } from "@customTypes/post"

interface SliderProps {
  mediaList: PostFile[]
  className?: string
}

function PostSlider({ mediaList, className }: SliderProps) {
  const [autoPlayIndex, setAutoPlayIndex] = useState(0)

  return (
    <div className={clsx(
      "aspect-square bg-separator-dark overflow-hidden",
      className,
    )}>
      {mediaList.map(({ type, url }, index) => (
        type === "photo" ? (
          <img
            key={index}
            src={url}
            alt={url}
          />
        ) : (
          <video
            key={index}
            src={url}
            autoPlay={index === autoPlayIndex} />
        )
      ))}
    </div>
  )
}

export default PostSlider
