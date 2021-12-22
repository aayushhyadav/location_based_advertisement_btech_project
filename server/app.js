const express = require("express")
const {json, urlencoded} = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./utility/connectDB")
const authRouter = require("./routes/auth")
const indexRouter = require("./routes/index")
const adRouter = require("./routes/ad")

const app = express()
const envVar = dotenv.config()
const PORT = Number(process.env.PORT)
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

app.listen(3000, () => console.log(`Server listening on ${PORT}`))
