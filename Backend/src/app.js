const express = require("express");
const songRoutes = require("./routes/song.routes");
const cors = require("cors");

//  create server
const app = express();

// to avoid the CORS Error
app.use(cors());

// to read data in req.body
app.use(express.json());

// to use the api created in files in  routes folders
app.use("/", songRoutes);

module.exports = app;
