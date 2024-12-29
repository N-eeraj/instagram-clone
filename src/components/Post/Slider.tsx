import {
  useEffect,
  useCallback,
} from "react"

import { Icon } from "@iconify/react"
import useEmblaCarousel from "embla-carousel-react"

import clsx from "clsx"
import { PostFile } from "@customTypes/post"

interface SliderProps {
  mediaList: PostFile[]
  currentIndex?: number
  className?: string
  onChange?: (_args: number) => void
}

function PostSlider({ mediaList, currentIndex, className, onChange }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      if (onChange && currentIndex !== undefined) {
        onChange(currentIndex - 1)
      } else {
        emblaApi.scrollPrev()
      }
    }
  }, [emblaApi, currentIndex])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      if (onChange && currentIndex !== undefined) {
        onChange(currentIndex + 1)
      } else {
        emblaApi.scrollNext()
      }
    }
  }, [emblaApi, currentIndex])

  useEffect(() => {
    if (emblaApi && currentIndex !== undefined) {
      emblaApi.scrollTo(currentIndex)
    }
  }, [currentIndex])

  return (
    <div
      ref={emblaRef}
      className={clsx(
        "relative aspect-square bg-black overflow-hidden",
        "embla",
        className,
    )}>
      <ul className={clsx(
        "h-full items-center",
        "embla__container",
      )}>
        {mediaList.map(({ type, url }, index) => (
          <li
            key={index}
            className="embla__slide">
            {type === "photo" ?
              <img
                src={url}
                alt={url}
                className="size-full object-cover"
              /> :
              <video
                src={url} />
            }
          </li>
        ))}
      </ul>

      {currentIndex && (
        <button
          className="absolute top-1/2 left-2 p-1 bg-black/50 rounded-full backdrop-blur-sm -translate-y-1/2"
          onClick={scrollPrev}>
          <Icon
            icon="mdi-chevron-left"
            fontSize={24} />
        </button>
      )}

      {Number(currentIndex) < (mediaList.length - 1) && (
        <button
          className="absolute top-1/2 right-2 p-1 bg-black/50 rounded-full backdrop-blur-sm -translate-y-1/2"
          onClick={scrollNext}>
          <Icon
            icon="mdi-chevron-right"
            fontSize={24} />
        </button>
      )}
    </div>
  )
}

export default PostSlider
