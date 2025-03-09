const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.static("public")); // Serve frontend files

const DOWNLOAD_DIR = "downloads";
if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR);

const FFMPEG_PATH = "C:\\ffmpeg\\bin\\ffmpeg.exe"; 

app.get("/convert", (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: "URL is required" });

    const fileName = `${Date.now()}.mp3`;
    const outputPath = path.join(__dirname, DOWNLOAD_DIR, fileName);

    const command = `yt-dlp -f ba --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist --ffmpeg-location "${FFMPEG_PATH}" -o "${outputPath}" "${videoUrl}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: stderr });
        res.json({ download_url: `/downloads/${fileName}` });
    });
});

app.use("/downloads", express.static(DOWNLOAD_DIR));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
