import { parseFile } from "music-metadata";
import fs from "fs";
import path from "path";

export async function scanMusicFolder(folder) {
  const files = fs.readdirSync(folder).filter((f) => f.endsWith(".mp3"));
  const metadataList = [];

  for (const file of files) {
    const metadata = await parseFile(path.join(folder, file));
    metadataList.push({
      title: metadata.common.title || file,
      artist: metadata.common.artist || "Unknown",
      file,
    });
  }

  return metadataList;
}
