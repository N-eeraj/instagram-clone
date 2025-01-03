import {
  useState,
  useEffect,
} from "react"
import {
  useParams,
  useNavigate,
} from "react-router"

import usePostFetch from "@hooks/useFetchPost"
import { updatePost } from "@firebaseApp/firestore"

export default function usePostUpdate() {
  const { postId } = useParams()
  if (!postId) return {}

  const navigate = useNavigate()

  const {
    post,
    loading,
  } = usePostFetch(postId)

  const [caption, setCaption] = useState("")
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    setCaption(post?.caption ?? "")
  }, [post])

  const goBack = () => {
    navigate(-1)
  }

  const handleUpdate = async () => {
    setDeleteLoading(true)
    await updatePost(postId, caption)
    setDeleteLoading(false)
    goBack()
  }

  return {
    post,
    goBack,
    caption,
    loading,
    setCaption,
    deleteLoading,
    handleUpdate,
  }
}
