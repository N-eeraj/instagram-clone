import {
  useState,
  ComponentProps,
  ChangeEvent,
} from "react"
import Error from "@components/ui/Error"
import { type FieldError } from "react-hook-form"
import clsx from "clsx"

interface InputProps extends ComponentProps<"input"> {
  errors?: FieldError
}

function Input({ type, placeholder, errors, onChange, ...inputProps }: InputProps) {
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
    <div>
      <div className={clsx(
        "relative flex items-center w-full h-9 bg-secondary outline rounded-sm",
        errors ? "outline-red-500" : "outline-separator-light",
      )}>
        <div className={clsx(
          "flex flex-col justify-end flex-1 h-full pl-2",
          (value && placeholder) && "pb-1",
        )}>
          {placeholder && (
            <small className={clsx(
              "absolute text-primary-text/60 duration-200 origin-top-left",
              value ? "top-0 scale-75" : "top-1/2 -translate-y-1/2",
            )}>
              {placeholder}
            </small>
          )}

          <input
            {...inputProps}
            type={currentType}
            className={clsx(
              "bg-transparent text-xs outline-none truncate z-10",
              (value && placeholder) ? "grow-0" : "flex-1",
            )}
            onChange={handleChange} />
        </div>

        {(value && type === "password") && (
          <button
            type="button"
            aria-label={currentType === "password" ? "Show password" : "Hide password"}
            className="mr-2 px-1 text-sm hover:opacity-50"
            onClick={togglePasswordVisibility}>
            {currentType === "password" ? "Show" : "Hide"}
          </button>
        )}
      </div>
      <Error errors={errors} />
    </div>
  )
}

export default Input
