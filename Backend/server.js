// to use the .env var we need to install and require dotenv package in server.js and call config() method , always write it in top because it has to load first
require("dotenv").config() 

const app = require("./src/app")
const connectDB = require("./src/db/db")

//  connecting to db
connectDB()


// strting server
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})