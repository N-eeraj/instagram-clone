import {
  forwardRef,
  ComponentProps,
  Ref,
} from "react"
import clsx from "clsx"

function Button({ disabled, className, children, ...buttonProps }: ComponentProps<"button">, ref: Ref<HTMLButtonElement>) {
  return (
    <button
      {...buttonProps}
      ref={ref}
      disabled={disabled}
      className={clsx(
        "h-8 mt-2 px-2 bg-primary-button text-primary-text rounded-lg",
        disabled && "opacity-70",
        !disabled && "hover:bg-primary-button-hovered",
        className,
      )}>
      {children}
    </button>
  )
}

export default forwardRef(Button)
