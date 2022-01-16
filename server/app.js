const express = require("express")
const {json, urlencoded} = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./utility/connectDB")

const authRouter = require("./routes/auth")
const indexRouter = require("./routes/index")
const adRouter = require("./routes/ad")
const statsRouter = require("./routes/stats")
const reviewRouter = require("./routes/review")

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

app.use("/", indexRouter.homeRouter)
app.use("/auth", authRouter.authRouter)
app.use("/ad", adRouter.adRouter)
app.use("/stats", statsRouter.statsRouter)
app.use("/review", reviewRouter.reviewRouter)

module.exports = app
