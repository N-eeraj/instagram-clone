import { Icon } from "@iconify/react"
import type { ArrowButtonsProps } from "@customTypes/post/ui"

function ArrowButtons({ length, currentIndex, onPrev, onNext }: ArrowButtonsProps) {
  return (
    <>
      {currentIndex && (
        <button
          className="left-2 embla-next-prev"
          onClick={onPrev}>
          <Icon
            icon="mdi-chevron-left"
            fontSize={24} />
        </button>
      )}

      {currentIndex < length - 1 && (
        <button
          className="right-2 embla-next-prev"
          onClick={onNext}>
          <Icon
            icon="mdi-chevron-right"
            fontSize={24} />
        </button>
      )}
    </>
  )
}

export default ArrowButtons
