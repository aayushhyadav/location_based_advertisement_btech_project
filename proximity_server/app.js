const express = require("express")
const {json, urlencoded} = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("../server/utility/connectDB")

const router = require("./routes/checkProximity")

const app = express()
const envVar = dotenv.config()
const MONGO_URI = process.env.MONGO_URI

if (envVar.error) {
  throw envVar.error
}

connectDB.connectDB(MONGO_URI)

app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))

app.use("/proximityServer", router.router)

module.exports = app
