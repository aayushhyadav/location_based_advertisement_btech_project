const express = require("express")
const User = require("../model/user")
const Store = require("../model/store")
const Stats = require("../model/stats")
const geocode = require("../utility/geocode")

const router = express.Router()

router.post("/userSignup", async (req, res) => {
  try {
    const user = new User.User(req.body)
    await user.save()
    res.status(201).send({user})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/businessSignup", async (req, res) => {
  try {
    const store = new Store.Store(req.body)
    const coords = await geocode.geocode(req.body.address)

    store.location.latitude = coords.lat
    store.location.longitude = coords.lng

    await store.save()
    const storeStats = new Stats.Stats({storeId: store._id})
    await storeStats.save()
    res.status(201).send({store})
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {authRouter: router}
