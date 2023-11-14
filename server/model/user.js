const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Enter a valid email")
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
  },
  dob: {
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
    default: 500,
  },
  accType: {
    type: String,
    required: true,
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
