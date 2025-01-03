import { useParams } from "react-router"
import usePostFetch from "@hooks/useFetchPost"

function EditPost() {
  const { postId } = useParams()
  if (!postId) return

  const {
    post,
    loading,
  } = usePostFetch(postId)
  console.log(post)

  return (
    <div>EditPost</div>
  )
}

export default EditPost
