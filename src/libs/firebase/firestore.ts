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

import { readFile } from "@appwriteApp/storage"
import { userProfileSchema } from "@schemas/user"
import type { User } from "firebase/auth"
import type { UserProfile } from "@customTypes/user"
import type {
  PostType,
  PostMediaType,
} from "@customTypes/post"

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

type UpdateProfileArgs = Partial<Pick<UserProfile, "userName" | "fullName" | "bio">> & Pick<User, "uid">
export async function updateUserProfile({ uid, ...profileData }: UpdateProfileArgs) {
  const userRef = doc(firestore, "users", uid)
  await updateDoc(userRef, profileData)
}

interface PostFileObject {
  type: PostMediaType
  fileId: string
}
interface PostObjectType {
  caption: string
  posts: PostFileObject[]
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
