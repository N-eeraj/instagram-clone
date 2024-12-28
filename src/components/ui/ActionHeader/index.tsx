import type {
  ReactNode,
  MouseEventHandler,
} from "react"
import { Icon } from "@iconify/react"

interface ActionHeaderProps {
  title: string
  action: {
    text?: string | ReactNode
    loading?: boolean
    disabled?: boolean
    onClick: MouseEventHandler
  }
  canceled: {
    text?: string | ReactNode
    disabled?: boolean
    onClick: MouseEventHandler
  }
}

function ActionHeader({ title, action, canceled }: ActionHeaderProps) {
  return (
    <header className="flex justify-between items-center w-full">
      <button
        disabled={canceled.disabled}
        className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={canceled.onClick}>
        {canceled.text ?? "Cancel"}
      </button>
      {title && (
        <h1 className="flex-2 text-lg text-white text-center font-medium">
          {title}
        </h1>
      )}
      <button
        disabled={action.loading || action.disabled}
        className="flex justify-end text-primary-button font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={action.onClick}>
        {action.loading ?
          <Icon
            icon="eos-icons:three-dots-loading"
            fontSize={28} /> :
          action.text ?? "Done"
        }
      </button>
    </header>
  )
}

export default ActionHeader
