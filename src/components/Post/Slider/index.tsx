import ArrowButtons from "@components/Post/Slider/ArrowButtons"
import Pagination from "@components/Post/Slider/Pagination"
import VideoPlayer from "@components/Post/Slider/VideoPlayer"

import useSlider from "@hooks/post/postSlider/useSlider"
import clsx from "clsx"
import type { SliderProps } from "@customTypes/post/ui"

function PostSlider({ mediaList, className, onDoubleClick, ...controlledProps }: SliderProps) {
  const {
    emblaApi,
    emblaRef,
    carouselIndex,
    scrollPrev,
    scrollNext,
  } = useSlider(controlledProps)

  return (
    <div
      ref={emblaRef}
      className={clsx(
        "relative aspect-square bg-black overflow-hidden",
        "embla",
        className,
        onDoubleClick && "cursor-pointer",
      )}
      onDoubleClick={onDoubleClick}>
      <ul className={clsx(
        "h-full items-center",
        "embla__container",
      )}>
        {mediaList.map(({ type, url }, index) => (
          <li
            key={index}
            className={clsx(
              "relative grid items-center h-full",
              "embla__slide",
            )}>
            {type === "photo" ?
              <img
                src={url}
                alt={url}
                className="size-full object-contain"
              /> :
              <VideoPlayer
                url={url}
                carouselIndex={carouselIndex}
                videoIndex={index} />
            }
          </li>
        ))}
      </ul>

      <ArrowButtons
        length={mediaList.length}
        currentIndex={carouselIndex}
        onPrev={scrollPrev}
        onNext={scrollNext} />

      <Pagination
        length={mediaList.length}
        currentIndex={carouselIndex}
        onChange={emblaApi?.scrollTo} />
    </div>
  )
}

export default PostSlider
