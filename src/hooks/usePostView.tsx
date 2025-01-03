import { use } from "react"
import { UserContext } from "@contexts/User"
import usePostFetch from "@hooks/useFetchPost"
import { togglePostLike } from "@firebaseApp/firestore"

export default function usePostView(id: string) {
  const {
    authUser,
    userProfile,
  } = use(UserContext)
  if (!authUser) return {}

  const {
    post,
    loading,
    setPost,
  } = usePostFetch(id)

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

  const isOwnPost = post?.user.userName === userProfile?.userName

  return {
    post,
    liked,
    loading,
    isOwnPost,
    handleLikeToggle,
  }
}
