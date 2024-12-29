import clsx from "clsx"
import type { PaginationProps } from "@customTypes/post/ui"

function Pagination({ length, currentIndex, onChange }: PaginationProps) {
  return (
    <ul className="absolute bottom-4 flex justify-center gap-x-2 w-full">
      {Array.from({ length }).map((_, index) => (
        <li
          key={index}
          className={clsx(
            "size-2 rounded-full cursor-pointer",
            index === currentIndex ? "bg-white" : "bg-white/50",
          )}
          onClick={() => onChange?.(index)} />
      ))}
    </ul>
  )
}

export default Pagination
