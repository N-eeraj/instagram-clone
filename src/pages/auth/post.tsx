import { useParams } from "react-router"
import ViewPost from "@components/Post/View"

function Post() {
  const { postId } = useParams()
  if (!postId) return

  return (
    <ViewPost id={postId} />
  )
}

export default Post
