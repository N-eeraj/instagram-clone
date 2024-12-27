import { PropsWithChildren } from "react"

interface ModalProps extends PropsWithChildren {
  show?: boolean
  title?: string
}

function Modal({ show, title, children }: ModalProps) {
  if (!show) return
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur z-30" />
      <div className="fixed top-1/2 left-1/2 flex flex-col items-center gap-y-4 w-11/12 max-w-sm aspect-[2] p-4 bg-secondary rounded-md shadow shadow-separator-dark -translate-x-1/2 -translate-y-1/2 z-50">
        {title && (
          <strong className="text-primary-button text-xl">
            {title}
          </strong>
        )}
        {children}
      </div>
    </>
  )
}

export default Modal
