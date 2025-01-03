import ActionHeader from "@components/ui/ActionHeader"
import PostSlider from "@components/Post/Slider"
import Textarea from "@components/ui/Textarea"
import usePostUpdate from "@hooks/post/usePostUpdate"

function EditPost() {
  const {
    post,
    goBack,
    caption,
    loading,
    setCaption,
    deleteLoading,
    handleUpdate,
  } = usePostUpdate()

  if (loading) {
    return (
      <h3 className="text-xl">
        Loading Post
        <span className="animate-pulse">
          ...
        </span>
      </h3>
    )
  }

  if (post) {
    return (
      <section className="grid md:grid-cols-2 gap-x-12 gap-y-4">
        <ActionHeader
          title="Update Caption"
          action={{
            text: "Update",
            loading: deleteLoading,
            onClick: handleUpdate,
          }}
          canceled={{
            disabled: deleteLoading,
            onClick: goBack,
          }}
          className="md:col-span-2" />

        <PostSlider
          mediaList={post.files}
          className="flex-1" />

        <Textarea
          value={caption}
          filled
          rows={6}
          placeholder="Write a caption"
          className="max-h-36 md:max-h-72"
          containerClassName="flex-1"
          onChange={({ target }) => setCaption(target.value)} />
      </section>
    )
  }
}

export default EditPost
