import { use } from "react"
import PostSlider from "@components/Post/Slider"
import { NewPostContext } from "@contexts/NewPost"

function Slider() {
  const {
    files,
    previewFileIndex,
    setPreviewFileIndex,
  } = use(NewPostContext)

  if (!files.length) {
    return (
      <div className="md:row-span-2" />
    )
  }

  return (
    <PostSlider
      mediaList={files}
      currentIndex={previewFileIndex}
      className="md:row-span-2"
      onChange={setPreviewFileIndex} />
  )
}

export default Slider
