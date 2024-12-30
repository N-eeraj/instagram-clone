import {
  use,
  useState,
  useEffect,
} from "react"
import { UserContext } from "@contexts/User"

import {
  fetchPostById,
  togglePostLike,
} from "@firebaseApp/firestore"
import type { PostType } from "@customTypes/post"

export default function usePostView(id: string) {
  const {
    authUser,
    userProfile,
  } = use(UserContext)
  if (!authUser) return {}
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<PostType | null>(null)

  const fetchPostData = async () => {
    setLoading(true)
    const post = await fetchPostById(id)
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
      id: post.id,
      liked,
      uid: authUser.uid,
    })
    setPost({
      ...post,
      likes,
    })
  }

  const isOwnPost = post?.userName === userProfile?.userName

  return {
    post,
    liked,
    loading,
    isOwnPost,
    handleLikeToggle,
  }
}
