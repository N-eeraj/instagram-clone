import NewPostHeader from "@components/Post/new/Header"
import PostSlider from "@components/Post/new/Slider"
import FilesSelection from "@components/Post/new/FilesSelection"
import Caption from "@components/Post/new/Caption"
import NewPostContextProvider from "@contexts/NewPost"

function NewPost() {
  return (
    <section className="grid md:grid-cols-2 md:grid-rows-[auto_64px_auto] md:gap-x-16 gap-y-2 md:gap-y-4">
      <NewPostContextProvider>
        <NewPostHeader />
        <PostSlider />
        <FilesSelection />
        <Caption />
      </NewPostContextProvider>
    </section>
  )
}

export default NewPost
