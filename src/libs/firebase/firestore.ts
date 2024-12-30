import {
  doc,
  query,
  where,
  limit,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  deleteField,
  getFirestore,
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
  PostFileObject,
  PostObjectType,
} from "@customTypes/post"
import type { NewPostData } from "@customTypes/post/new"

const firestore = getFirestore(app)

export async function fetchProfileByUserName(userName: string): Promise<UserProfile | null> {
  const userQuery = query(collection(firestore, "users"), where("userName", "==", userName), limit(1))
  const userDocs = await getDocs(userQuery)
  if (userDocs.empty) return null
  const profileData = userDocs.docs[0].data()
  const parsedData = userProfileSchema.parse(profileData)
  return parsedData
}

export async function isUsernameTaken(userName: string): Promise<boolean> {
  const profileData = await fetchProfileByUserName(userName)
  return Boolean(profileData)
}

export async function addUserData(userData: UserProfile, uid: string) {
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

export async function fetchUserPosts(userName: string): Promise<PostType[]> {
  const userPostQuery = query(collection(firestore, "posts"), where("userName", "==", userName))
  const userPosts = await getDocs(userPostQuery)
  const userPostsData = await Promise.all(userPosts.docs.map(async (doc) => {
    const {
      posts,
      caption,
    } = doc.data() as PostObjectType

    const files = await Promise.all(posts.map(async ({ type, fileId }: PostFileObject) => {
      const url = await readFile(fileId)
      return {
        type,
        url,
      }
    }))

    return {
      caption,
      files,
      id: doc.id,
    }
  }))
  return userPostsData as PostType[]
}

export async function createUserPost({ uid, caption, files, userName }: NewPostData) {
  const fileData = await Promise.all(files.map(async ({ file, type }) => {
    const fileId = await createFile(file)

    return {
      fileId,
      type,
    }
  }))

  console.log({
    uid,
    caption,
    files: fileData,
    userName,
  })
}
