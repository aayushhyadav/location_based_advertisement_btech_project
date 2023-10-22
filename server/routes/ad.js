const express = require("express")
const Store = require("../model/store")
const Stats = require("../model/stats")

const router = express.Router()

router.post("/create", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.body.id)
    store.advertisement.push(req.body.ad)

    const savedStore = await store.save()
    const numAds = savedStore.advertisement.length

    /* creating stats entry for the ad */
    const adStats = new Stats.Stats({
      adId: savedStore.advertisement[numAds - 1]._id,
    })
    await adStats.save()

    res.status(201).send({Msg: "Created new Advertisement!"})
  } catch (error) {
    res.status(500).send({
      Msg: "We encountered an error while saving offer details. Please try again or contact support.",
    })
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
    let adList = store.advertisement

    if (req.query.accType === "normal") {
      const curDate = new Date(Date.now())
      const curDateString = new Date(curDate.toISOString().split("T")[0])

      adList = adList.filter((ad) => {
        const expiryDate = new Date(ad.validTill)
        return expiryDate.getTime() - curDateString.getTime() >= 0
      })
    }

    res.status(200).send(adList)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post("/update", async (req, res) => {
  try {
    const store = await Store.Store.findById(req.body.storeId)
    const adList = store.advertisement

    for (const ad of adList) {
      if (ad._id.toString() === req.body.adId) {
        req.body.likeValue
          ? ad.likedBy.push(req.body.userId)
          : (ad.likedBy = ad.likedBy.filter(
              (userId) => userId !== req.body.userId
            ))
      }
    }
    await store.save()
    res.status(200).send({Msg: "Updated successfully!"})
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = {adRouter: router}
