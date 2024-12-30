import {
  use,
  useState,
  useEffect,
} from "react"
import { useParams } from "react-router"

import PostSlider from "@components/Post/Slider"
import { UserContext } from "@contexts/User"
import {
  fetchPostById,
  togglePostLike,
} from "@firebaseApp/firestore"
import { Icon } from "@iconify/react"

import clsx from "clsx"
import type { PostType } from "@customTypes/post"

function Post() {
  const { authUser } = use(UserContext)
  const { postId } = useParams()
  if (!(postId && authUser)) return
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<PostType | null>(null)

  const fetchPostData = async () => {
    setLoading(true)
    const post = await fetchPostById(postId)
  if (post) {
      setPost(post)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPostData()
  }, [])

  const liked = post?.likes.includes(authUser.uid) ?? false

  const handleLikeToggle = () => {
    if (!post) return
    let likes
    if (liked) {
      likes = post.likes.filter((uid: string) => uid !== authUser.uid)
    } else {
      likes = [
        ...post.likes,
        authUser.uid,
      ]
    }
    togglePostLike({
      postId,
      liked,
      uid: authUser.uid,
    })
    setPost({
      ...post,
      likes,
    })
  }

  return (
    <section className="relative flex flex-col gap-y-2 max-w-sm mx-auto">
      {loading && (
        <>
          <div className="w-full aspect-square bg-white/5 animate-pulse" />
          <div className="w-full h-6 bg-white/5 animate-pulse" />
        </>
      )}
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

          <div className="flex items-center gap-x-1">
            <Icon
              icon={`material-symbols:favorite${!liked ?  "-outline" : ""}`}
              fontSize={28}
              className={clsx(
                "cursor-pointer",
                liked && "text-red-600",
              )}
              onClick={handleLikeToggle} />
            {Boolean(post.likes.length) && (
              <span>
                {`Liked by ${post.likes.length}`}
              </span>
            )}
          </div>

          <p>
            <strong className="text-white font-bold">
              {post.userName}
            </strong>
            &nbsp;&nbsp;
            {post.caption}
          </p>
        </>
      )}
    </section>
  )
}

export default Post
