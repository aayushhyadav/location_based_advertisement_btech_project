const mongoose = require("mongoose")

const statSchema = mongoose.Schema({
  adId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  data: {
    ageGroupCount: {
      _11To17: {
        type: Number,
        default: 0,
      },
      _18To30: {
        type: Number,
        default: 0,
      },
      _31To59: {
        type: Number,
        default: 0,
      },
      _60AndAbove: {
        type: Number,
        default: 0,
      },
    },
    genderCount: {
      male: {
        type: Number,
        default: 0,
      },
      female: {
        type: Number,
        default: 0,
      },
    },
    review: [
      {
        username: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
    privacyBudget: {
      type: Number,
      default: 5,
    },
  },
})

const Stats = mongoose.model("Stats", statSchema)

module.exports = {Stats}
