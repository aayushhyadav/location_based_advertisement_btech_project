const express = require("express")
const User = require("../model/user")
const Store = require("../model/store")
const Cluster = require("../model/cluster")
const geocode = require("../utility/geocode")
const createCluster = require("../utility/createCluster")
const {decodeJwt, generateJwt} = require("../utility/tokenHelper")

const router = express.Router()

router.post("/userSignup", async (req, res) => {
  try {
    const user = new User.User(req.body)
    await user.save()
    res.status(201).send({user})
  } catch (error) {
    res.status(500).send({
      Msg: "Please ensure password contains at-least 7 characters and email is unique.",
    })
  }
})

router.post("/userLogin", async (req, res) => {
  try {
    const credentials = req.body.sessionToken
      ? decodeJwt(req.body.sessionToken)
      : {}

    credentials.email = credentials.email ?? req.body.email
    credentials.password = credentials.password ?? req.body.password

    const user = await User.User.findOne({
      email: credentials.email,
      password: credentials.password,
    })

    if (user == null) {
      res.status(404).send({Msg: "User not found!"})
      return
    }

    let jwtToken
    if (!req.body.sessionToken) {
      jwtToken = generateJwt(credentials.email, credentials.password)
    }

    const userDetails = {
      _id: user._id,
      name: user.name,
      radiusOfChoice: user.radiusOfChoice,
      email: user.email,
      accType: user.accType,
      gender: user.gender,
      dob: user.dob,
      sessionToken: jwtToken ?? req.body.sessionToken,
    }

    res.status(200).send(userDetails)
  } catch (error) {
    const Msg =
      error?.message === "Token Expired!"
        ? "Session Expired! Please Login"
        : "Internal server error"
    res.status(500).send({Msg})
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
    console.log(error.message)

    let Msg
    if (error?.errors?.email) {
      Msg = "Please enter a valid email!"
    } else if (error?.errors?.contact) {
      Msg = "Please enter a valid contact number!"
    } else if (error?.message === "Geocoding failed!") {
      Msg = "Please enter a valid address!"
    } else {
      Msg =
        "We encountered an error while setting up your business. Please try again or contact support."
    }

    res.status(500).send({
      Msg,
    })
  }
})

router.get("/viewBusiness", async (req, res) => {
  try {
    const stores = await Store.Store.find({owner: req.query.id})
    const storeDetails = []

    stores.forEach((store) => {
      const details = {}
      details.id = store._id
      details.name = store.name
      details.address = store.streetAddress + ", " + store.city
      details.type = store.type

      storeDetails.push(details)
    })

    res.status(200).send(storeDetails)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = {authRouter: router}
