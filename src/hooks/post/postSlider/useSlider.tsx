import {
  useState,
  useEffect,
  useCallback,
} from "react"

import useEmblaCarousel from "embla-carousel-react"
import type { ControlledSlider } from "@customTypes/post/ui"

export default function useSlider({ currentIndex, onChange }: ControlledSlider) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [currentInternalIndex, setCarouselIndex] = useState(0)

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
      if (onChange && currentIndex !== undefined) {
        onChange(selectedSlide)
      } else {
        setCarouselIndex(selectedSlide)
      }
    })
  }, [emblaApi])

  const carouselIndex = currentIndex ?? currentInternalIndex

  return {
    emblaApi,
    emblaRef,
    carouselIndex,
    scrollPrev,
    scrollNext,
  }
}
