const ImageKit = require("imagekit");
const mongoose = require("mongoose")

// setup imagekit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// create function to upload song file in image kit
function uploadFile(file) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: file.buffer,
        // to give unique/random id/name for storing each file
        fileName: (new mongoose.Types.ObjectId().toString()),
        folder: "cohort-moodyPlayer-audio",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });
}

module.exports = uploadFile;
