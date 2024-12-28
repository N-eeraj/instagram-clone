import { useNavigate } from "react-router"
import ActionHeader from "@components/ui/ActionHeader"

function NewPost() {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const handleCreatePost = () => {}

  return (
    <ActionHeader
      title="New Post"
      action={{
        onClick: handleCreatePost,
      }}
      canceled={{
        onClick: goBack,
      }} />
  )
}

export default NewPost
