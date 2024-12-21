import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore"
import app from  "@firebaseApp/init"

import { UserDetails } from "@customTypes/user"

const firestore = getFirestore(app)

export async function isUsernameTaken(userName: string): Promise<boolean> {
  const firestoreQuery = query(collection(firestore, "users"), where("userName", "==", userName))
  const queryCollection = await getDocs(firestoreQuery)
  return !queryCollection.empty
}

export async function addUserData(userData: UserDetails) {
  const userCollectionRef = doc(collection(firestore, "users"), userData.uid)
  await setDoc(userCollectionRef, userData)
}
