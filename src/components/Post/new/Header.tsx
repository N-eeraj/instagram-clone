import { use } from "react"
import { useNavigate } from "react-router"

import ActionHeader from "@components/ui/ActionHeader"
import { NewPostContext } from "@contexts/NewPost"
import { Icon } from "@iconify/react"

function NewPostHeader() {
  const {
    files,
    loading,
    handleCreatePost,
  } = use(NewPostContext)
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <ActionHeader
      title="New Post"
      action={{
        disabled: !files.length,
        loading,
        onClick: handleCreatePost,
      }}
      canceled={{
        text: (
          <Icon
            icon="material-symbols:arrow-left-alt-rounded"
            fontSize={24} />
        ),
        disabled: loading,
        onClick: goBack,
      }}
      className="md:col-span-2" />
  )
}

export default NewPostHeader
