import { useState } from "react"
import { Link } from "react-router"
import Modal from "@components/ui/Modal"
import { Icon } from "@iconify/react"

function PostOptions({ id }: { id: string }) {
  const [showOptions, setShowOptions] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const confirmDelete = async () => {
    setShowOptions(false)
    setShowDeleteConfirmation(true)
  }

  return (
    <div className="relative flex justify-end items-center h-10 p-2 bg-white/5">
      <button onClick={() => setShowOptions(true)}>
        <Icon
          icon="mi:options-vertical"
          fontSize={24} />
      </button>

      {showOptions && (
        <>
          <div
            className="fixed top-0 left-0 size-full z-10"
            onClick={() => setShowOptions(false)} />
          <ul className="absolute top-full right-0 min-w-32 bg-secondary rounded shadow-sm shadow-separator-dark z-10">
            <li>
              <Link
                to="edit"
                className="flex justify-end items-center w-full px-1 py-2 hover:bg-black/50 duration-200">
                <span>
                  Edit
                </span>
              </Link>
            </li>
            <li>
              <button
                className="flex justify-end items-center w-full px-1 py-2 hover:bg-black/50 duration-200"
                onClick={confirmDelete}>
                <span>
                  Delete
                </span>
              </button>
            </li>
          </ul>
        </>
      )}


      <Modal
        show={showDeleteConfirmation}
        title="Are you sure to delete this post"
        dismissible
        onClose={() => setShowDeleteConfirmation(false)}>
      </Modal>
    </div>
  )
}

export default PostOptions
