import { ID } from "appwrite"
import appwriteStorage, {
  appwriteBucketId,
} from "@appwriteApp/init"

export async function createFile(file: File) {
  const response = await appwriteStorage.createFile(
    appwriteBucketId,
    ID.unique(),
    file
  )
  return response.$id
}

export async function readFile(fileId: string) {
  const fileUrl = await appwriteStorage.getFileView(appwriteBucketId, fileId)
  return fileUrl
}

export async function removeFile(fileId: string) {
  await appwriteStorage.deleteFile(appwriteBucketId, fileId)
}
