import { use } from "react"
import PostSlider from "@components/Post/Slider"
import { NewPostContext } from "@contexts/NewPost"

function Slider() {
  const { files } = use(NewPostContext)

  return (
    <PostSlider
      mediaList={files}
      className="md:row-span-2" />
  )
}

export default Slider
