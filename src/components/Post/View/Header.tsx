import {
  use,
  useState,
} from "react"
import {
  Link,
  useNavigate,
} from "react-router"

import DisplayPicture from "@components/DisplayPicture"
import Button from "@components/ui/Button"
import Modal from "@components/ui/Modal"
import { UserContext } from "@contexts/User"

import { deleteUserPost } from "@firebaseApp/firestore"
import { Icon } from "@iconify/react"
import type { PostType } from "@customTypes/post"

function PostHeader({ id, user, updatable }: {
  id: string
  user: PostType["user"]
  updatable: boolean
}) {
  const [showOptions, setShowOptions] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const {
    authUser,
    userProfile,
  } = use(UserContext)
  const navigate = useNavigate()

  const confirmDelete = async () => {
    setShowOptions(false)
    setShowDeleteConfirmation(true)
  }

  const handleDeletePost = async () => {
    if (!authUser?.uid) return
    setLoadingDelete(true)
    try {
      await deleteUserPost(id, authUser.uid)
      navigate(`/${userProfile?.userName}`)
    } finally {
      setLoadingDelete(false)
    }
  }

  return (
    <div className="relative flex justify-between items-center h-10 p-2 bg-white/5">
      <Link
        to={`/${user.userName}`}
        className="flex items-center gap-x-2">
        <DisplayPicture
          displayPicture={user.displayPicture}
          userName={user.userName}
          className="!size-8" />
        <strong className="text-white font-semibold">
          {user.userName}
        </strong>
      </Link>

      {updatable && (
        <>
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
              <ul className="absolute top-full right-0 min-w-32 bg-secondary rounded divide-y divide-separator-dark shadow-sm shadow-separator-dark z-10">
                <li>
                  <Link
                    to="edit"
                    className="flex justify-between items-center w-full px-4 py-2 hover:bg-black/50 hover:text-primary-button duration-200">
                    <Icon icon="material-symbols:edit-outline" />
                    <span>
                      Edit
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    className="flex justify-between items-center w-full px-4 py-2 hover:bg-black/50 text-red-500 duration-200"
                    onClick={confirmDelete}>
                    <Icon icon="material-symbols:delete-outline" />
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
            title="Confirm Deletion"
            titleClassName="text-red-500 font-medium">
            <div>
              <p className="text-center">
                You are about to delete this post.
              </p>
              <p className="text-center">
                Are you sure you want to continue?
              </p>
              <div className="flex gap-x-4 mt-4">
                <Button
                  disabled={loadingDelete}
                  className="flex-1 bg-white/10 hover:bg-white/20"
                  onClick={() => setShowDeleteConfirmation(false)}>
                  Cancel
                </Button>
                <Button
                  loading={loadingDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                  onClick={handleDeletePost}>
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}

export default PostHeader
