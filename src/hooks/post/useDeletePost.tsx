import {
  use,
  useState,
} from "react"
import { useNavigate } from "react-router"

import { UserContext } from "@contexts/User"
import { deleteUserPost } from "@firebaseApp/firestore"

export default function useDeletePost(id: string) {
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

  return {
    showOptions,
    loadingDelete,
    confirmDelete,
    setShowOptions,
    handleDeletePost,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  }
}