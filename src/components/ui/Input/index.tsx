import {
  useState,
  type ComponentProps,
  type ChangeEvent,
  type ReactElement,
} from "react"
import Error from "@components/ui/Error"

import { Icon } from "@iconify/react"
import { type FieldError } from "react-hook-form"
import clsx from "clsx"

export interface InputProps extends ComponentProps<"input"> {
  errors?: FieldError
  showValidityIcon?: boolean
  filled?: boolean
  placeholderLabel?: boolean
  prepend?: ReactElement | string | number
}

interface ValidityIcon {
  hasValue: boolean
  hasErrors: boolean
}

function Input({ type, placeholder, errors, showValidityIcon = false, filled, placeholderLabel, prepend, className, onChange, ...inputProps }: InputProps) {
  const [currentType, setCurrentType] = useState(type)
  const togglePasswordVisibility = () => {
    setCurrentType(previousType => previousType === "password" ? "text" : "password")
  }

  const [value, setValue] = useState(inputProps.defaultValue ?? inputProps.value)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    setValue(event.target.value)
  }

  return (
    <div className={clsx(
      className,
      inputProps.disabled && "opacity-60 cursor-not-allowed",
    )}>
      <div className={clsx(
        "relative flex items-center w-full h-9 pr-2 text-primary-text rounded-sm",
        filled ? "bg-white/5" : "bg-secondary outline",
        errors ? "outline-red-500" : "outline-separator-light",
        prepend && "pl-2",
        inputProps.disabled && "cursor-not-allowed",
      )}>
        {prepend && prepend}
        <div className={clsx(
          "flex flex-col justify-end flex-1 h-full pl-2",
          (value && placeholder) && "pb-1",
        )}>
          {placeholderLabel && placeholder && (
            <small className={clsx(
              "absolute text-primary-text/60 duration-200 origin-top-left",
              value ? "top-0 scale-75" : "top-1/2 -translate-y-1/2",
            )}>
              {placeholder}
            </small>
          )}

          <input
            placeholder={placeholderLabel ? "" : placeholder}
            {...inputProps}
            type={currentType}
            className={clsx(
              "bg-transparent text-xs outline-none truncate disabled:cursor-not-allowed z-10",
              (value && placeholderLabel && placeholder) ? "grow-0" : "flex-1",
            )}
            onChange={handleChange} />
        </div>

        {showValidityIcon && (
          <ValidityIcon
            hasValue={!!value}
            hasErrors={!!errors} />
        )}

        {(value && type === "password") && (
          <button
            type="button"
            aria-label={currentType === "password" ? "Show password" : "Hide password"}
            className="px-1 text-sm hover:opacity-50"
            onClick={togglePasswordVisibility}>
            {currentType === "password" ? "Show" : "Hide"}
          </button>
        )}
      </div>

      <Error errors={errors} />
    </div>
  )
}

function ValidityIcon({ hasValue, hasErrors }: ValidityIcon) {
  if (hasValue || hasErrors) {
    return (
      <Icon
        icon={hasErrors ? "radix-icons:cross-circled" : "radix-icons:check-circled"}
        fontSize={24}
        className={clsx(
          hasErrors && "text-red-500"
        )} />
    )
  }
}

export default Input
