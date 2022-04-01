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
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number")
      }
    },
  },
  gender: {
    type: String,
    required: true,
  },
  radiusOfChoice: {
    type: Number,
    default: 500,
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
