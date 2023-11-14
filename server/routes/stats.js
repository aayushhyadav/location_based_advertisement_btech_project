const express = require("express")
const User = require("../model/user")
const Store = require("../model/store")
const Stats = require("../model/stats")
const laplace = require("../utility/laplace")
const postProcessing = require("../utility/postProcessing")

const router = express.Router()

router.post("/update", async (req, res) => {
  try {
    const user = await User.User.findById(req.body.userId)
    const adStats = await Stats.Stats.findOne({adId: req.body.adId})
    const likeValue = req.body.likeValue

    if (user.age >= 11 && user.age <= 17) {
      likeValue
        ? (adStats.data.ageGroupCount._11To17 += 1)
        : (adStats.data.ageGroupCount._11To17 -= 1)
    } else if (user.age >= 18 && user.age <= 30) {
      likeValue
        ? (adStats.data.ageGroupCount._18To30 += 1)
        : (adStats.data.ageGroupCount._18To30 -= 1)
    } else if (user.age >= 31 && user.age <= 59) {
      likeValue
        ? (adStats.data.ageGroupCount._31To59 += 1)
        : (adStats.data.ageGroupCount._31To59 -= 1)
    } else {
      likeValue
        ? (adStats.data.ageGroupCount._60AndAbove += 1)
        : (adStats.data.ageGroupCount._60AndAbove -= 1)
    }

    if (user.gender === "Male") {
      likeValue
        ? (adStats.data.genderCount.male += 1)
        : (adStats.data.genderCount.male -= 1)
    } else if (user.gender === "Female") {
      likeValue
        ? (adStats.data.genderCount.female += 1)
        : (adStats.data.genderCount.female -= 1)
    }

    await adStats.save()
    res.status(200).send({Msg: "Stats updated!"})
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/getStats", async (req, res) => {
  const epsilon = 1

  const Stat = {
    male: 0,
    female: 0,
    _11To17: 0,
    _18To30: 0,
    _31To59: 0,
    _60AndAbove: 0,
  }
  const stats = []
  let noisyStats = []

  try {
    const adStats = await Stats.Stats.findOne({adId: req.query.adId})
    const {genderCount, ageGroupCount, privacyBudget} = adStats.data

    if (privacyBudget != 0) {
      stats.push(genderCount.male)
      stats.push(genderCount.female)
      stats.push(ageGroupCount._11To17)
      stats.push(ageGroupCount._18To30)
      stats.push(ageGroupCount._31To59)
      stats.push(ageGroupCount._60AndAbove)

      noisyStats = [...stats]

      if (
        genderCount.male +
          genderCount.female +
          ageGroupCount._11To17 +
          ageGroupCount._18To30 +
          ageGroupCount._31To59 +
          ageGroupCount._60AndAbove !==
        0
      ) {
        adStats.data.privacyBudget -= epsilon
        await adStats.save()

        noisyStats = await laplace.laplace(stats, 2)
        noisyStats = postProcessing.computeConsistentStats(noisyStats)
      }

      Stat.male = noisyStats[0]
      Stat.female = noisyStats[1]
      Stat._11To17 = noisyStats[2]
      Stat._18To30 = noisyStats[3]
      Stat._31To59 = noisyStats[4]
      Stat._60AndAbove = noisyStats[5]

      res.status(200).send(Stat)
      return
    }
    res.status(200).send({Msg: "Access Forbidden due to Privacy Reasons"})
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get("/aggregateStats", async (req, res) => {
  const epsilon = 0.5
  index = -1
  var allow = false
  const Stat = {
    male: 0,
    female: 0,
    _11To17: 0,
    _18To30: 0,
    _31To59: 0,
    _60AndAbove: 0,
    _12amTo3am: 0,
    _3amTo6am: 0,
    _6amTo9am: 0,
    _9amTo12pm: 0,
    _12pmTo3pm: 0,
    _3pmTo6pm: 0,
    _6pmTo9pm: 0,
    _9pmTo12am: 0,
  }
  const stats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  try {
    const store = await Stats.Stats.findOne({storeId: req.query.storeId})
    const fromEpoch = new Date(req.query.from).getTime()
    const toEpoch = new Date(req.query.to).getTime()

    if (fromEpoch > toEpoch) {
      throw "Please enter the range correctly"
    }

    for (const record of store.data) {
      index += 1
      if (
        record.epoch >= fromEpoch &&
        record.epoch <= toEpoch &&
        record.privacyBudget > 0
      ) {
        stats[0] += record.genderCount.male
        stats[1] += record.genderCount.female
        stats[2] += record.ageGroupCount._11To17
        stats[3] += record.ageGroupCount._18To30
        stats[4] += record.ageGroupCount._31To59
        stats[5] += record.ageGroupCount._60AndAbove
        stats[6] += record.timestamp._12amTo3am
        stats[7] += record.timestamp._3amTo6am
        stats[8] += record.timestamp._6amTo9am
        stats[9] += record.timestamp._9amTo12pm
        stats[10] += record.timestamp._12pmTo3pm
        stats[11] += record.timestamp._3pmTo6pm
        stats[12] += record.timestamp._6pmTo9pm
        stats[13] += record.timestamp._9pmTo12am
        store.data[index].privacyBudget -= epsilon
        allow = true
      }
    }

    if (allow) {
      await store.save()
    } else {
      res.status(400).send({Msg: "Access forbidden"})
      return
    }

    noisyStats = await laplace.laplace(stats, 2)

    Stat.male = noisyStats[0]
    Stat.female = noisyStats[1]
    Stat._11To17 = noisyStats[2]
    Stat._18To30 = noisyStats[3]
    Stat._31To59 = noisyStats[4]
    Stat._60AndAbove = noisyStats[5]
    Stat._12amTo3am = noisyStats[6]
    Stat._3amTo6am = noisyStats[7]
    Stat._6amTo9am = noisyStats[8]
    Stat._9amTo12pm = noisyStats[9]
    Stat._12pmTo3pm = noisyStats[10]
    Stat._3pmTo6pm = noisyStats[11]
    Stat._6pmTo9pm = noisyStats[12]
    Stat._9pmTo12am = noisyStats[13]

    res.status(200).send(Stat)
  } catch (error) {
    res.status(400).send({Msg: error})
  }
})
module.exports = {statsRouter: router}
