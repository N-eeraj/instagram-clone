import type { MouseEventHandler } from "react"
import type { PostFile } from "@customTypes/post"

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
