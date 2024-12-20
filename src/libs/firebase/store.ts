import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import app from  "@firebaseApp/init"

const firestore = getFirestore(app)

export async function isUsernameTaken(userName: string): Promise<boolean> {
  const firestoreQuery = query(collection(firestore, "users"), where("userName", "==", userName))
  const queryCollection = await getDocs(firestoreQuery)
  return !queryCollection.empty
}
