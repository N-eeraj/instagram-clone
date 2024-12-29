import { use } from "react"
import PostSlider from "@components/Post/Slider"
import { NewPostContext } from "@contexts/NewPost"

function Slider() {
  const {
    files,
    previewFileIndex,
    setPreviewFileIndex,
  } = use(NewPostContext)

  return (
    <PostSlider
      mediaList={files}
      currentIndex={previewFileIndex}
      className="md:row-span-2"
      onChange={setPreviewFileIndex} />
  )
}

export default Slider
