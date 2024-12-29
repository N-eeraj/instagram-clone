import { use } from "react"
import { useNavigate } from "react-router"

import ActionHeader from "@components/ui/ActionHeader"
import { NewPostContext } from "@contexts/NewPost"
import { Icon } from "@iconify/react"

function NewPostHeader() {
  const {
    files,
    caption,
  } = use(NewPostContext)
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  const handleCreatePost = () => {
    console.log("create post with", { files, caption })
  }

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
      }}
      className="md:col-span-2" />
  )
}

export default NewPostHeader
