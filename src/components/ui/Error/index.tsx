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
      <small className="text-red-400">
        {errors.message}
      </small>
    )
  }
}

export default Error
