// import express from "express";
// import cors from "cors";
// import { scanMusicFolder } from "./utils/metadata.js";
// import streamRoutes from "./routes/stream.js";
// import artRoutes from "./routes/art.js";
// app.use("/art", artRoutes);

// const app = express();
// app.use(cors());
// app.use(express.static("public"));
// app.use("/stream", streamRoutes);

// app.get("/api/songs", async (req, res) => {
//   const songs = await scanMusicFolder("./music");
//   res.json(songs);
// });

// app.listen(3000, () => {
//   console.log("🎵 Music server running at http://localhost:3000");
// });

import express from "express";
import cors from "cors";
import multer from "multer";
import { scanMusicFolder } from "./utils/metadata.js";
import streamRoutes from "./routes/stream.js";
import artRoutes from "./routes/art.js";
import { parseFile } from "music-metadata";

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use("/art", artRoutes);
app.use("/stream", streamRoutes);

// Setup multer for file uploads
const upload = multer({ dest: "music/" });

// Route for uploading music
app.post("/upload", upload.single("song"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    // Extract metadata using music-metadata
    const metadata = await parseFile(file.path);
    const title = metadata.common.title || file.originalname;
    const artist = metadata.common.artist || "Unknown";

    // Respond with song data
    res.json({
      title,
      artist,
      file: file.filename,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("Error processing file");
  }
});

// API to get songs from the music folder
app.get("/api/songs", async (req, res) => {
  const songs = await scanMusicFolder("./music");
  res.json(songs);
});

// Start server
app.listen(3000, () => {
  console.log("🎵 Music server running at http://localhost:3000");
});
