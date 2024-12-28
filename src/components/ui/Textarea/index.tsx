import type { ComponentProps } from "react"
import Error from "@components/ui/Error"
import { type FieldError } from "react-hook-form"
import clsx from "clsx"

interface TextareaProps extends ComponentProps<"textarea"> {
  errors?: FieldError
  filled?: boolean
}

function Textarea({ errors, filled, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <textarea
        {...props}
        className={clsx(
          "px-2 py-1 text-primary-text rounded",
          filled ? "bg-white/5" : "bg-secondary outline",
          errors ? "outline-red-500" : "outline-separator-light",
          className,
        )} />
      <Error errors={errors} />
    </div>
  )
}

export default Textarea
