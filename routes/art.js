import express from "express";
import { parseFile } from "music-metadata";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/:filename", async (req, res) => {
  const filePath = path.join("music", req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const metadata = await parseFile(filePath);
  const pic = metadata.common.picture?.[0];

  if (pic) {
    res.set("Content-Type", pic.format);
    res.send(pic.data);
  } else {
    res.redirect("/default-art.png"); // fallback image
  }
});

export default router;
