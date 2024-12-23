import {
  doc,
  query,
  where,
  limit,
  setDoc,
  getDoc,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore"
import app from  "@firebaseApp/init"

import { userProfileSchema } from "@schemas/user"
import type { UserProfile } from "@customTypes/user"

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
