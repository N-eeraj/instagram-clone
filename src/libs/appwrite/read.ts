import appwriteStorage, {
  appwriteBucketId,
} from "@appwriteStorage/init"

export default async function readFile(fileId: string) {
  const fileUrl = await appwriteStorage.getFileView(appwriteBucketId, fileId)
  return fileUrl
}
