import {
  useRef,
  useState,
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
  const [currentInternalIndex, setCarouselIndex] = useState(0)

  const videos = useRef<Array<HTMLVideoElement | null>>([])
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

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

  useEffect(() => {
    emblaApi?.on("select", (emblaApi) => {
      const selectedSlide = emblaApi.selectedScrollSnap()

      const currentVideo = videos.current[selectedSlide]
      if (currentVideo) {
        currentVideo.play()
        setPlayingVideo(selectedSlide)
      }
      else {
        videos.current.forEach(video => {
          if (video) {
            video.pause()
            video.currentTime = 0
          }
          setPlayingVideo(null)
        })
      }

      if (onChange && currentIndex !== undefined) {
        onChange(selectedSlide)
      } else {
        setCarouselIndex(selectedSlide)
      }
    })
  }, [emblaApi])

  const carouselIndex = currentIndex ?? currentInternalIndex

  const handleVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videos.current[index] = el
  }

  const playVideo = (index: number) => {
    const video = videos.current[index]
    if (video) {
      video.play()
      setPlayingVideo(index)
    }
  }

  const pauseVideo = (index: number) => {
    const video = videos.current[index]
    if (video) {
      video.pause()
      setPlayingVideo(null)
    }
  }

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
              <>
                <video
                  ref={(el) => handleVideoRef(el, index)}
                  src={url}
                  onClick={() => pauseVideo(index)} />
                {playingVideo === null && (
                  <div
                    className="absolute top-1/2 left-1/2 grid place-content-center size-full bg-black/20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => playVideo(index)}>
                    <Icon
                      icon="material-symbols:play-arrow-rounded"
                      fontSize={60} />
                  </div>
                )}
              </>
            }
          </li>
        ))}
      </ul>

      {carouselIndex && (
        <button
          className="absolute top-1/2 left-2 p-1 bg-black/50 rounded-full backdrop-blur-sm -translate-y-1/2"
          onClick={scrollPrev}>
          <Icon
            icon="mdi-chevron-left"
            fontSize={24} />
        </button>
      )}

      {carouselIndex < (mediaList.length - 1) && (
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
