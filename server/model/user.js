const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
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
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  radiusOfChoice: {
    type: Number,
  },
  notInterestedBusiness: [
    {
      storeId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
})

const User = mongoose.model("User", userSchema)

module.exports = {User}
