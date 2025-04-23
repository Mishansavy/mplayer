import { Client, Storage, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://syd.cloud.appwrite.io/v1")
  .setProject("6809247f002275dbd4db");

const storage = new Storage(client);
const account = new Account(client);

async function ensureAuth() {
  try {
    await account.get();
  } catch (err) {
    await account.createAnonymousSession();
  }
}

export async function uploadTrack(file) {
  await ensureAuth();

  const uploaded = await storage.createFile(
    "680924b2000eaba808f2",
    ID.unique(),
    file
  );

  const previewUrl = storage.getFilePreview(
    "680924b2000eaba808f2",
    uploaded.$id
  );

  return {
    title: file.name,
    artist: "Unknown",
    file: uploaded.$id,
    url: previewUrl,
  };
}
