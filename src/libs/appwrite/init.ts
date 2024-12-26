import { Client, Storage } from "appwrite"

export const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID
export const appwriteBucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(appwriteProjectId)

const appwriteStorage = new Storage(client)

export default appwriteStorage
