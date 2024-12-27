import appwriteStorage, {
  appwriteBucketId,
} from "@appwriteStorage/init"

export default async function removeFile(fileId: string) {
  await appwriteStorage.deleteFile(appwriteBucketId, fileId)
}
