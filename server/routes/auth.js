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
    res.status(400).send(error)
  }
})

router.post("/businessSignup", async (req, res) => {
  try {
    const store = new Store.Store(req.body)
    const coords = await geocode.geocodeToCoords(
      req.body.name + ", " + req.body.streetAddress + ", " + req.body.city
    )

    store.location.latitude = coords.lat
    store.location.longitude = coords.lng

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

module.exports = {authRouter: router}
