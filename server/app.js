const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./connectDB")

const app = express()
const envVar = dotenv.config()
const PORT = Number(process.env.PORT)
const MONGO_URI = process.env.MONGO_URI

if (envVar.error) {
  throw envVar.error
}

connectDB.connectDB(MONGO_URI)

app.listen(3000, () => console.log(`Server listening on ${PORT}`))
