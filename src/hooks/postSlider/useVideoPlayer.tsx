import {
  useRef,
  useState,
  useEffect,
} from "react"
import type { VideoPlayerProps } from "@customTypes/post/ui"

export default function useVideoPlayer({ videoIndex, carouselIndex }: Omit<VideoPlayerProps, "url">) {
  const video = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const playVideo = () => {
    if (video.current) {
      setIsPlaying(true)
    }
  }

  const pauseVideo = () => {
    if (video.current) {
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const isCurrentVideo = carouselIndex === videoIndex
    setIsPlaying(isCurrentVideo)
    if (!isCurrentVideo && video.current) {
      video.current.pause()
      video.current.currentTime = 0
    }
  }, [carouselIndex])

  useEffect(() => {
    if (isPlaying) {
      video.current?.play()
    } else {
      video.current?.pause()
    }
  }, [isPlaying])

  return {
    video,
    pauseVideo,
    playVideo,
    isPlaying,
  }
}
