const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const router = express.Router();
const songModel = require("../models/song.model");
const upload = multer({ storage: multer.memoryStorage() });

/* song data send by postman: titleartist,audio,mood */

router.post("/songs", upload.single("audio"), async (req, res) => {
  // it gives text data
  console.log(req.body);
  // it gives file data
  console.log(req.file);

  // store file in imagekit,and return the details with uploaded song url
  const fileData = await uploadFile(req.file);
//   console.log(fileData);

  const song = await songModel.create({
    title: req.body.title,
    artist: req.body.artist,
    audio: fileData.url,
    mood: req.body.mood,
  });

  res.status(201).json({
    message: "song created successfully",
    song: song,
  });
});

// To Send song data from database to Frontend
router.get("/songs",async(req,res)=>{
    const {mood} = req.query
    const songs = await songModel.find({
        mood:mood
    })

    res.status(200).json({
        message:"Songs Fetched Successfully",
        songs
    })
})

module.exports = router;
