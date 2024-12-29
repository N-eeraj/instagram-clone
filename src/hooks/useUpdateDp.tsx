import { use } from "react"
import { UserContext } from "@contexts/User"

import { updateDp } from "@firebaseApp/firestore"
import {
  readFile,
  createFile,
} from "@appwriteApp/storage"

export default function useUpdateDp() {
  const {
    authUser,
    userProfile,
    setUserProfile,
  } = use(UserContext)
  if (!(authUser && userProfile)) return {}

  const updateDpHandler = async (dpFile: File): Promise<string | void> => {
    const fileId = await createFile(dpFile)
    updateDp(authUser.uid, fileId)
    const url = await readFile(fileId)
    setUserProfile({
      ...userProfile,
      profilePicture: fileId,
      displayPicture: url,
    })
    return url
  }

  return {
    updateDpHandler,
  }
}
