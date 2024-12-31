import type {
  PropsWithChildren,
  MouseEventHandler,
} from "react"
import { Icon } from "@iconify/react"
import clsx from "clsx"

interface ModalProps extends PropsWithChildren {
  show?: boolean
  title?: string
  dismissible?: true
  titleClassName?: string
  onClose?: MouseEventHandler
}


function Modal({ show, title, dismissible, titleClassName, children, onClose }: ModalProps) {
  if (!show) return
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur z-30" />
      <div className="fixed top-1/2 left-1/2 flex flex-col items-center gap-y-4 w-11/12 max-w-sm aspect-[2] p-4 bg-secondary rounded-md shadow shadow-separator-dark -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex justify-between items-center w-full">
            {title && (
              <strong className={clsx(
                "text-primary-button text-xl mx-auto",
                titleClassName,
              )}>
                {title}
              </strong>
            )}
            {(dismissible && onClose) && (
              <button onClick={onClose}>
                <Icon
                  icon="mdi-close"
                  className="text-primary-text" />
              </button>
            )}
          </div>
        {children}
      </div>
    </>
  )
}

export default Modal
