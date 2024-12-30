import {
  useState,
  useEffect,
} from "react"
import { useParams } from "react-router"

import PostSlider from "@components/Post/Slider"
import { fetchPostById } from "@firebaseApp/firestore"
import { Icon } from "@iconify/react"
import type { PostType } from "@customTypes/post"

function Post() {
  const {
    userName,
    postId,
  } = useParams()
  if (!postId) return
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
            mediaList={post.files} />
          {post.files.length > 1 && (
            <Icon
              icon="mdi:checkbox-multiple-blank"
              fontSize={24}
              className="absolute top-2 right-2" />
          )}
          <p>
            <strong className="text-white font-bold">
              {userName}
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
