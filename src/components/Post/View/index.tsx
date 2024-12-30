import { Link } from "react-router"
import PostSlider from "@components/Post/Slider"
import LoadingPost from "@components/Post/View/Loading"
import Likes from "@components/Post/View/Likes"
import usePostView from "@hooks/usePostView"
import { Icon } from "@iconify/react"

function ViewPost({ id }: { id: string }) {
  const {
    post,
    liked,
    loading,
    handleLikeToggle,
  } = usePostView(id)

  return (
    <section className="relative flex flex-col gap-y-2 max-w-sm mx-auto">
      {loading && <LoadingPost />}

      {post && (
        <>
          <PostSlider
            mediaList={post.files}
            onDoubleClick={handleLikeToggle} />

          {post.files.length > 1 && (
            <Icon
              icon="mdi:checkbox-multiple-blank"
              fontSize={24}
              className="absolute top-2 right-2" />
          )}

          <Likes
            liked={liked}
            likes={post.likes.length}
            onToggle={handleLikeToggle} />

          <p>
            <Link to={`/${post.userName}`}>
              <strong className="text-white font-bold">
                {post.userName}
              </strong>
            </Link>
            &nbsp;&nbsp;
            {post.caption}
          </p>
        </>
      )}
    </section>
  )
}

export default ViewPost
