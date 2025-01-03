import { Icon } from "@iconify/react"
import useVideoPlayer from "@hooks/post/postSlider/useVideoPlayer"
import type { VideoPlayerProps } from "@customTypes/post/ui"

function VideoPlayer({ url, ...props }: VideoPlayerProps) {
  const {
    video,
    pauseVideo,
    playVideo,
    isPlaying,
  } = useVideoPlayer(props)

  return (
    <>
      <video
        ref={video}
        src={url}
        loop
        onClick={pauseVideo} />
      {!isPlaying && (
        <div
          className="absolute top-1/2 left-1/2 grid place-content-center size-full bg-black/20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={playVideo}>
          <Icon
            icon="material-symbols:play-arrow-rounded"
            fontSize={60} />
        </div>
      )}
    </>
  )
}

export default VideoPlayer
