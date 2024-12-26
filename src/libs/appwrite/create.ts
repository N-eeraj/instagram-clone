import { ID } from "appwrite"
import appwriteStorage, {
  appwriteBucketId,
} from "@appwriteStorage/init"

export default async function createFile(file: File) {
  const response = await appwriteStorage.createFile(
    appwriteBucketId,
    ID.unique(),
    file
  )
  return response
}
