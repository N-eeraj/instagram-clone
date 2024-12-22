import {
  doc,
  query,
  where,
  setDoc,
  getDoc,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore"
import app from  "@firebaseApp/init"

import { userDetailsSchema } from "@schemas/user"
import type { UserDetails } from "@customTypes/user"

const firestore = getFirestore(app)

export async function isUsernameTaken(userName: string): Promise<boolean> {
  const firestoreQuery = query(collection(firestore, "users"), where("userName", "==", userName))
  const queryCollection = await getDocs(firestoreQuery)
  return !queryCollection.empty
}

export async function addUserData(userData: UserDetails, uid: string) {
  const userCollectionRef = doc(collection(firestore, "users"), uid)
  await setDoc(userCollectionRef, userData)
}

export async function fetchUserProfile(uid: string): Promise<UserDetails> {
  const userDocRef = doc(collection(firestore, "users"), uid)
  const userDoc = await getDoc(userDocRef)
  const parsedData = userDetailsSchema.parse(userDoc.data())
  return parsedData
}
