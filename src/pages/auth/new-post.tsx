import { useNavigate } from "react-router"
import ActionHeader from "@components/ui/ActionHeader"
import { Icon } from "@iconify/react"

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
        text: (
          <Icon
            icon="material-symbols:arrow-left-alt-rounded"
            fontSize={24} />
        ),
        onClick: goBack,
      }} />
  )
}

export default NewPost
