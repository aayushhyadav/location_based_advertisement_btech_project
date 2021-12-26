const express = require("express")
const Store = require("../model/store")

const router = express.Router()

router.post("/create", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.body.id)
    store.advertisement.push(req.body.ad)
    await store.save()
    res.status(201).send({Msg: "Created new Advertisement!"})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post("/delete", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.body.storeId)

    store.advertisement = store.advertisement.filter((ad) => {
      return ad._id != req.body.adId
    })

    await store.save()
    res.status(200).send({Msg: "Advertisement deleted!"})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/view", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.query.id)
    const adList = store.advertisement
    res.status(200).send(adList)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {adRouter: router}
