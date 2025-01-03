import { Link } from "react-router"

import PostSlider from "@components/Post/Slider"
import LoadingPost from "@components/Post/View/Loading"
import Likes from "@components/Post/View/Likes"
import PostHeader from "@components/Post/View/Header"

import usePostView from "@hooks/post/usePostView"
import { Icon } from "@iconify/react"

function ViewPost({ id }: { id: string }) {
  const {
    post,
    liked,
    loading,
    isOwnPost,
    handleLikeToggle,
  } = usePostView(id)

  return (
    <section className="flex flex-col gap-y-2 max-w-sm mx-auto">
      {loading && <LoadingPost />}

      {post && (
        <>
          <div className="relative">
            <PostHeader
              id={post.id}
              user={post.user}
              updatable={isOwnPost} />

            <PostSlider
              mediaList={post.files}
              onDoubleClick={handleLikeToggle} />

            {post.files.length > 1 && (
              <Icon
                icon="mdi:checkbox-multiple-blank"
                fontSize={24}
                className="absolute top-12 right-2" />
            )}
          </div>

          <Likes
            liked={liked}
            likes={post.likes.length}
            onToggle={handleLikeToggle} />

          <p>
            <Link to={`/${post.user.userName}`}>
              <strong className="text-white font-bold">
                {post.user.userName}
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
