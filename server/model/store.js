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
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  advertisement: [
    {
      offer: {
        type: String,
      },
    },
  ],
})

const Store = mongoose.model("Store", storeSchema)

module.exports = {Store}
