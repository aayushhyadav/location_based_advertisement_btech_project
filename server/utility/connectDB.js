const mongoose = require("mongoose")

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`Database connected at ${mongoUri}`)
  } catch (error) {
    console.error("Error connecting database", error.message)
    process.exit(1)
  }
}

module.exports = {connectDB}
