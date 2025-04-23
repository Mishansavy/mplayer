import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6809247f002275dbd4db");

const storage = new Storage(client);

export async function uploadTrack(file) {
  const response = await storage.createFile(
    "680924b2000eaba808f2",
    ID.unique(),
    file
  );
  return storage.getFilePreview("680924b2000eaba808f2", response.$id); // streaming URL
}
