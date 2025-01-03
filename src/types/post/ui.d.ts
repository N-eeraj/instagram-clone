import type { MouseEventHandler } from "react"
import type {
  PostFile,
  PostType,
} from "@customTypes/post"


export interface ControlledSlider {
  currentIndex?: number
  onChange?: (_args: number) => void
}

export interface SliderProps extends ControlledSlider {
  mediaList: PostFile[]
  className?: string
  onDoubleClick?: MouseEventHandler
}

export interface VideoPlayerProps {
  url: string
  videoIndex: number
  carouselIndex: number
}

export interface ArrowButtonsProps {
  length: number
  currentIndex: number
  onPrev: MouseEventHandler
  onNext: MouseEventHandler
}

export interface PaginationProps {
  length: number
  currentIndex: number
  onChange?: (_args: number) => void
}

export interface LikeProps {
  liked: boolean
  likes: number
  onToggle: MouseEventHandler
}

export interface PostHeaderProps {
  id: string
  user: PostType["user"]
  updatable: boolean
}
