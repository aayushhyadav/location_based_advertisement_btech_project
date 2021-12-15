const mongoose = require("mongoose")

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
  contact: {
    type: Number,
  },
})

const Store = mongoose.model("Store", storeSchema)

module.exports = {Store}
