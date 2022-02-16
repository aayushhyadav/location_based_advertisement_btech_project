const express = require("express")
const User = require("../model/user")
const Store = require("../model/store")
const Stats = require("../model/stats")
const laplace = require("../utility/laplace")

const router = express.Router()

router.post("/update", async (req, res) => {
  try {
    const user = await User.User.findById(req.body.userId)
    const storeStats = await Stats.Stats.findOne({storeId: req.body.storeId})

    const date = new Date()
    var dateString = date.toString()
    const time = Number(dateString.substring(16, 18))
    dateString = dateString.substring(0, 15)
    var entry = undefined

    if (storeStats.data.length != 0) {
      storeStats.data.forEach((record) => {
        if (record.date == dateString) {
          entry = record
        }
      })
    }

    if (entry === undefined) {
      storeStats.data.push({
        date: dateString,
        epoch: new Date(dateString).getTime(),
      })
      entry = storeStats.data[storeStats.data.length - 1]
    }

    if (user.age >= 11 && user.age <= 17) {
      entry.ageGroupCount._11To17 += 1
    } else if (user.age >= 18 && user.age <= 30) {
      entry.ageGroupCount._18To30 += 1
    } else if (user.age >= 31 && user.age <= 59) {
      entry.ageGroupCount._31To59 += 1
    } else {
      entry.ageGroupCount._60AndAbove += 1
    }

    user.gender == "male"
      ? (entry.genderCount.male += 1)
      : (entry.genderCount.female += 1)

    if (time >= 0 && time < 3) {
      entry.timestamp._12amTo3am += 1
    } else if (time >= 3 && time < 6) {
      entry.timestamp._3amTo6am += 1
    } else if (time >= 6 && time < 9) {
      entry.timestamp._6amTo9am += 1
    } else if (time >= 9 && time < 12) {
      entry.timestamp._9amTo12pm += 1
    } else if (time >= 12 && time < 15) {
      entry.timestamp._12pmTo3pm += 1
    } else if (time >= 15 && time < 18) {
      entry.timestamp._3pmTo6pm += 1
    } else if (time >= 18 && time < 21) {
      entry.timestamp._6pmTo9pm += 1
    } else {
      entry.timestamp._9pmTo12am += 1
    }

    await storeStats.save()
    res.status(200).send({Msg: "Stats updated!"})
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get("/dailyStats", async (req, res) => {
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
  const stats = []

  try {
    const store = await Stats.Stats.findOne({storeId: req.query.storeId})

    for (const record of store.data) {
      if (record.date.includes(req.query.date)) {
        stats.push(record.genderCount.male)
        stats.push(record.genderCount.female)
        stats.push(record.ageGroupCount._11To17)
        stats.push(record.ageGroupCount._18To30)
        stats.push(record.ageGroupCount._31To59)
        stats.push(record.ageGroupCount._60AndAbove)
        stats.push(record.timestamp._12amTo3am)
        stats.push(record.timestamp._3amTo6am)
        stats.push(record.timestamp._6amTo9am)
        stats.push(record.timestamp._9amTo12pm)
        stats.push(record.timestamp._12pmTo3pm)
        stats.push(record.timestamp._3pmTo6pm)
        stats.push(record.timestamp._6pmTo9pm)
        stats.push(record.timestamp._9pmTo12am)
        break
      }
    }

    console.log(`Daily stats - ${stats}`)
    noisyStats = await laplace.laplace(stats, 1)
    console.log(`Daily stats with noise - ${noisyStats}`)

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

router.get("/aggregateStats", async (req, res) => {
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
      if (record.epoch >= fromEpoch && record.epoch <= toEpoch) {
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
      }
    }

    console.log(`Aggregate stats - ${stats}`)
    noisyStats = await laplace.laplace(stats, 1)
    console.log(`Aggregate stats with noise - ${noisyStats}`)

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
