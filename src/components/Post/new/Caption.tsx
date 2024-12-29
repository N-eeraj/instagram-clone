import { use } from "react"
import Textarea from "@components/ui/Textarea"
import { NewPostContext } from "@contexts/NewPost"

function Caption() {
  const {
    caption,
    setCaption,
  } =use(NewPostContext)

  return (
    <Textarea
      value={caption}
      filled
      rows={6}
      placeholder="Write a caption"
      onChange={({ target }) => setCaption(target.value)} />
  )
}

export default Caption
