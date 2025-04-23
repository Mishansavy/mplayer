const client = new Appwrite.Client()
  .setEndpoint("https://syd.cloud.appwrite.io/v1")
  .setProject("6809247f002275dbd4db");

const storage = new Appwrite.Storage(client);

export async function uploadTrack(file) {
  const uploaded = await storage.createFile(
    "680924b2000eaba808f2",
    "unique()",
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
