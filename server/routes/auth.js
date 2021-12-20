const express = require("express")
const User = require("../model/user")
const Store = require("../model/store")
const geocode = require("../utility/geocode")

const router = express.Router()

router.post("/userSignup", async (req, res) => {
  const user = new User.User(req.body)

  try {
    await user.save()
    res.status(201).send({user})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/businessSignup", async (req, res) => {
  const store = new Store.Store(req.body)
  const coords = await geocode.geocode(req.body.address)

  // store.location.latitude = coords.latitude
  // store.location.longitude = coords.longitude

  try {
    await store.save()
    res.status(201).send({store})
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {authRouter: router}
