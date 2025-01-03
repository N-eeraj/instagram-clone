import {
  doc,
  query,
  where,
  limit,
  setDoc,
  getDoc,
  orderBy,
  getDocs,
  increment,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
  deleteField,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore"
import app from  "@firebaseApp/init"

import { createFile, readFile } from "@appwriteApp/storage"
import { userProfileSchema } from "@schemas/user"
import type {
  UserProfile,
  UpdateProfileArgs,
} from "@customTypes/user"
import type {
  PostType,
  PostObjectType,
  PostFileObject,
  PostLikeToggle,
  PostListItemType,
} from "@customTypes/post"
import type { NewPostData } from "@customTypes/post/new"

const firestore = getFirestore(app)

export async function fetchProfileByUserName(userName: string): Promise<UserProfile | null> {
  const userQuery = query(collection(firestore, "users"), where("userName", "==", userName), limit(1))
  const userDocs = await getDocs(userQuery)
  if (userDocs.empty) return null
  const profileData = userDocs.docs[0].data()
  const parsedData = userProfileSchema.parse(profileData)
  return {
    ...parsedData,
    uid: userDocs.docs[0].id,
  }
}

export async function isUsernameTaken(userName: string): Promise<boolean> {
  const profileData = await fetchProfileByUserName(userName)
  return Boolean(profileData)
}

export async function createUser(userData: UserProfile, uid: string) {
  const userCollectionRef = doc(collection(firestore, "users"), uid)
  await setDoc(userCollectionRef, userData)
}

export async function fetchProfileByUid(uid: string): Promise<UserProfile> {
  const userDocRef = doc(collection(firestore, "users"), uid)
  const userDoc = await getDoc(userDocRef)
  const parsedData = userProfileSchema.parse(userDoc.data())
  return parsedData
}

export async function updateDp(uid: string, fileId: string) {
  const userRef = doc(firestore, "users", uid)
  await updateDoc(userRef, {
    profilePicture: fileId,
  })
}

export async function deleteDP(uid: string) {
  const userRef = doc(firestore, "users", uid)
  await updateDoc(userRef, {
    profilePicture: deleteField(),
  })
}

export async function updateUserProfile({ uid, ...profileData }: UpdateProfileArgs) {
  const userRef = doc(firestore, "users", uid)
  await updateDoc(userRef, profileData)
}

export async function fetchUserPosts(userName: string): Promise<PostListItemType[]> {
  const profileDetails = await fetchProfileByUserName(userName)
  const userPostQuery = query(collection(firestore, "posts"), where("uid", "==", profileDetails?.uid), orderBy("createdAt", "desc"))
  const userPosts = await getDocs(userPostQuery)
  const userPostsData = await Promise.all(userPosts.docs.map(async (doc) => {
    const {
      files,
      caption,
    } = doc.data() as PostObjectType

    const {
      fileId,
      type,
    } = files[0]
    const url = await readFile(fileId)

    return {
      caption,
      file: {
        type,
        url,
        hasMultiFiles: files.length > 1,
      },
      id: doc.id,
    }
  }))
  return userPostsData as PostListItemType[]
}

export async function fetchPostById(postId: string): Promise<PostType | void> {
  const postDocRef = doc(collection(firestore, "posts"), postId)
  const postDoc = await getDoc(postDocRef)
  const postData = postDoc.data()
  if (!postData) return
  postData.files = await Promise.all(postData.files.map(async ({ type, fileId }: PostFileObject) => {
    const url = await readFile(fileId)
    return {
      type,
      url,
    }
  }))
  const {
    userName,
    profilePicture: fileId,
  } = await fetchProfileByUid(postData.uid)
  let displayPicture
  if (fileId) {
    displayPicture = await readFile(fileId)
  }
  postData.user = {
    userName,
    displayPicture,
  }
  postData.likes ??= []
  postData.id = postId
  return postData as PostType
}

export async function createUserPost({ uid, caption, files }: NewPostData) {
  const fileData = await Promise.all(files.map(async ({ file, type }) => {
    const fileId = await createFile(file)

    return {
      fileId,
      type,
    }
  }))

  const postsCollectionRef = doc(collection(firestore, "posts"))
  await setDoc(postsCollectionRef, {
    uid,
    caption,
    files: fileData,
    createdAt: serverTimestamp(),
  })

  const userCollectionRef = doc(firestore, "users", uid)
  await updateDoc(userCollectionRef, {
    posts: increment(1),
  })
}

export async function togglePostLike({ id, liked, uid }: PostLikeToggle) {
  const postRef = doc(firestore, "posts", id)
  await updateDoc(postRef, {
    likes: liked ? arrayRemove(uid) : arrayUnion(uid),
  })
}

export async function updatePost(id: string, caption: string) {
  const postRef = doc(firestore, "posts", id)
  await updateDoc(postRef, { caption })
}
