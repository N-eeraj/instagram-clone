import type {
  Message,
  FieldError,
} from "react-hook-form"

interface ErrorType {
  errors?: Partial<FieldError | { message: Message }>
}

function Error({ errors }: ErrorType) {
  if (errors) {
    return (
      <small className="inline-block mt-1 text-red-500 text-xs">
        {errors.message}
      </small>
    )
  }
}

export default Error
