const express = require("express")
const User = require("../model/user")
const Stats = require("../model/stats")

const router = express.Router()

router.post("/post", async (req, res) => {
  try {
    const storeStats = await Stats.Stats.findOne({storeId: req.body.storeId})
    const user = await User.User.findById(req.body.userId)

    const date = new Date()
    var dateString = date.toString()
    dateString = dateString.substring(0, 15)
    var entry = undefined

    if (storeStats.data.length != 0) {
      entry = storeStats.data.filter((record) => {
        return record.date == dateString
      })
    }

    entry[0].review.push({username: user.name, rating: req.body.rating})
    await storeStats.save()

    res.status(200).send({Msg: "Thank you for your feedback!"})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/view/", async (req, res) => {
  try {
    const store = await Stats.Stats.findOne({storeId: req.query.storeId})
    var reviews = []
    store.data.forEach((record) => {
      const date = record.date
      const reviewList = record.review
      reviews.push({date, reviewList})
    })

    reviews = reviews.reverse()
    res.status(200).send(reviews)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {reviewRouter: router}
