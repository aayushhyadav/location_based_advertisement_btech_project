const express = require("express")
const User = require("../model/user")
const Store = require("../model/store")
const Stats = require("../model/stats")
const Cluster = require("../model/cluster")
const geocode = require("../utility/geocode")
const createCluster = require("../utility/createCluster")

const router = express.Router()

router.post("/userSignup", async (req, res) => {
  try {
    const user = new User.User(req.body)
    await user.save()
    res.status(201).send({user})
  } catch (error) {
    res.status(400).send({
      Msg: "Please ensure password contains at-least 7 characters and email is unique.",
    })
  }
})

router.post("/userLogin", async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.User.findOne({email: email, password: password})

    if (user == null) {
      throw "User not found. Please check your credentials."
    }

    const userDetails = {
      id: user._id,
      name: user.name,
      aor: user.radiusOfChoice,
      accType: user.accType,
    }

    res.status(200).send(userDetails)
  } catch (error) {
    res.status(400).send({error})
  }
})

router.post("/businessSignup", async (req, res) => {
  try {
    const store = new Store.Store(req.body)
    const coords = await geocode.geocodeToCoords(
      req.body.name + ", " + req.body.streetAddress + ", " + req.body.city
    )

    store.latitude = coords.lat
    store.longitude = coords.lng

    await store.save()

    /* creating stats entry for the business */
    const storeStats = new Stats.Stats({storeId: store._id})
    await storeStats.save()

    var cluster = await Cluster.Cluster.findOne({city: req.body.city})

    if (cluster === null) {
      cluster = new Cluster.Cluster({
        city: req.body.city,
        poi: [store._id],
      })
      await cluster.save()
    } else {
      cluster.poi.push(store._id)
      await cluster.save()
    }

    /* form clusters */
    await createCluster.create(cluster)

    res.status(201).send({store})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/viewBusiness", async (req, res) => {
  try {
    const stores = await Store.Store.find({owner: req.query.id})
    const storeDetails = []

    if (stores.length == 0) {
      throw "No businesses have been registered by you."
    }

    stores.forEach((store) => {
      const details = {
        name: "",
        id: "",
        address: "",
      }
      details.id = store._id
      details.name = store.name
      details.address = store.streetAddress + ", " + store.city
      storeDetails.push(details)
    })

    res.status(200).send(storeDetails)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {authRouter: router}
