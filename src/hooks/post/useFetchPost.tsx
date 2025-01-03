import {
  useEffect,
  useState,
} from "react"

import { fetchPostById } from "@firebaseApp/firestore"
import type { PostType } from "@customTypes/post"

export default function usePostFetch(id: string) {
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

  return {
    post,
    loading,
    setPost,
  }
}
