import {
  ComponentProps,
} from "react"
import { Icon } from "@iconify/react"
import clsx from "clsx"

interface ButtonProps extends ComponentProps<"button"> {
  loading?: boolean
}

function Button({ loading, disabled, className, children, ...buttonProps }: ButtonProps) {
  return (
    <button
      {...buttonProps}
      disabled={disabled || loading}
      className={clsx(
        "min-w-24 h-8 mt-2 px-2 bg-primary-button text-primary-text rounded-lg",
        (disabled || loading) && "opacity-70 cursor-not-allowed",
        !(disabled && loading) && "hover:bg-primary-button-hovered",
        className,
      )}>

      {loading ? (
        <Icon
          icon="line-md:loading-twotone-loop"
          className="mx-auto size-full p-1" />
        ) :
        children
      }
    </button>
  )
}

export default Button
