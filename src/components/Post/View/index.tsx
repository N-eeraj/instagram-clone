import { Link } from "react-router"

import PostSlider from "@components/Post/Slider"
import LoadingPost from "@components/Post/View/Loading"
import Likes from "@components/Post/View/Likes"
import PostOptions from "@components/Post/View//Options"

import usePostView from "@hooks/usePostView"
import { Icon } from "@iconify/react"
import clsx from "clsx"

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
            {isOwnPost && <PostOptions id={post.id} />}

            <PostSlider
              mediaList={post.files}
              onDoubleClick={handleLikeToggle} />

            {post.files.length > 1 && (
              <Icon
                icon="mdi:checkbox-multiple-blank"
                fontSize={24}
                className={clsx(
                  "absolute right-2",
                  isOwnPost ? "top-12" : "top-2"
                )} />
            )}
          </div>

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
