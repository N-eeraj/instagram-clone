import {
  useState,
  forwardRef,
  ComponentProps,
  Ref,
  ChangeEvent,
} from "react"
import clsx from "clsx"

function Input({ type, placeholder, className, onChange, ...inputProps }: Readonly<ComponentProps<"input">>, ref: Ref<HTMLInputElement>) {
  const [currentType, setCurrentType] = useState<typeof type>(type)
  const toggleCurrentType = () => {
    setCurrentType(previousType => previousType === "password" ? "text" : "password")
  }

  const [value, setValue] = useState(inputProps.value)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
    setValue(event.target.value)
  }

  return (
    <div className="relative flex items-center w-full h-9 bg-secondary outline outline-separator rounded-sm">
      <div className={clsx("flex flex-col justify-end flex-1 h-full pl-2", value && "pb-1")}>
        <small className={clsx("absolute text-primary-text/60 duration-200 origin-top-left", value ? "top-0 scale-75" : "top-1/2 -translate-y-1/2")}>
          {placeholder}
        </small>
        <input
          {...inputProps}
          ref={ref}
          type={currentType}
          className={clsx("bg-transparent text-xs outline-none truncate z-10", className, value ? "grow-0" : "flex-1")}
          onChange={handleChange} />
      </div>
      {type === "password" && (
        <button
          type="button"
          className="px-1 text-sm"
          onClick={toggleCurrentType}>
          {currentType === "password" ? "Show" : "Hide"}
        </button>
      )}
    </div>
  )
}

export default forwardRef(Input)
