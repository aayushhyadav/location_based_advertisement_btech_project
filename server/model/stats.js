const mongoose = require("mongoose")

const statSchema = mongoose.Schema({
  statistics: [
    {
      storeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      data: [
        {
          date: {
            type: String,
          },
          epoch: {
            type: Number,
          },
          ageGroupCount: {
            _11To18: {
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
          timestamp: {
            _12pmTo3pm: {
              type: Number,
              default: 0,
            },
            _3pmTo6pm: {
              type: Number,
              default: 0,
            },
            _6pmTo9pm: {
              type: Number,
              default: 0,
            },
            _9pmTo12am: {
              type: Number,
              default: 0,
            },
            _12amTo3am: {
              type: Number,
              default: 0,
            },
            _3amTo6am: {
              type: Number,
              default: 0,
            },
            _6amTo9am: {
              type: Number,
              default: 0,
            },
            _9amTo12pm: {
              type: Number,
              default: 0,
            },
          },
          review: [
            {
              user: {
                type: mongoose.Schema.Types.ObjectId,
              },
              rating: {
                type: Number,
              },
            },
          ],
        },
      ],
    },
  ],
})

const Stats = mongoose.model("Stats", statSchema)

module.exports = {Stats}
