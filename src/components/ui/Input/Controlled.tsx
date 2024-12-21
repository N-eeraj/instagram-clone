import {
  Controller,
  type Control,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form"
import Input, { type InputProps } from "@components/ui/Input"

interface ControlledInputProps {
  name: any
  control: Control<any> | undefined
  rules?: Omit<RegisterOptions<FieldValues, any>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
  inputProps: InputProps
}

function ControlledInput({ inputProps, ...controllerProps }: ControlledInputProps) {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => (
        <Input
          {...field}
          {...inputProps} />
      )} />
  )
}

export default ControlledInput
