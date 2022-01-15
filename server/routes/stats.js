const express = require("express")
const User = require("../model/user")
const Store = require("../model/store")
const Stats = require("../model/stats")

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

  try {
    const store = await Stats.Stats.findOne({storeId: req.query.storeId})

    for (const record of store.data) {
      if (record.date.includes(req.query.date)) {
        Stat.male = record.genderCount.male
        Stat.female = record.genderCount.female
        Stat._11To17 = record.ageGroupCount._11To17
        Stat._18To30 = record.ageGroupCount._18To30
        Stat._31To59 = record.ageGroupCount._31To59
        Stat._60AndAbove = record.ageGroupCount._60AndAbove
        Stat._12amTo3am = record.timestamp._12amTo3am
        Stat._3amTo6am = record.timestamp._3amTo6am
        Stat._6amTo9am = record.timestamp._6amTo9am
        Stat._9amTo12pm = record.timestamp._9amTo12pm
        Stat._12pmTo3pm = record.timestamp._12pmTo3pm
        Stat._3pmTo6pm = record.timestamp._3pmTo6pm
        Stat._6pmTo9pm = record.timestamp._6pmTo9pm
        Stat._9pmTo12am = record.timestamp._9pmTo12am
        break
      }
    }
    res.status(200).send(Stat)
  } catch (error) {
    res.status(400).send({Msg: `No statistics for ${req.query.date}`})
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

  try {
    const store = await Stats.Stats.findOne({storeId: req.query.storeId})
    const searchStr =
      req.query.isMonth == true ? req.query.month : req.query.year

    for (const record of store.data) {
      if (record.date.includes(searchStr)) {
        Stat.male += record.genderCount.male
        Stat.female += record.genderCount.female
        Stat._11To17 += record.ageGroupCount._11To17
        Stat._18To30 += record.ageGroupCount._18To30
        Stat._31To59 += record.ageGroupCount._31To59
        Stat._60AndAbove += record.ageGroupCount._60AndAbove
        Stat._12amTo3am += record.timestamp._12amTo3am
        Stat._3amTo6am += record.timestamp._3amTo6am
        Stat._6amTo9am += record.timestamp._6amTo9am
        Stat._9amTo12pm += record.timestamp._9amTo12pm
        Stat._12pmTo3pm += record.timestamp._12pmTo3pm
        Stat._3pmTo6pm += record.timestamp._3pmTo6pm
        Stat._6pmTo9pm += record.timestamp._6pmTo9pm
        Stat._9pmTo12am += record.timestamp._9pmTo12am
      }
    }

    res.status(200).send(Stat)
  } catch (error) {
    res.status(400).send({Msg: `No statistics for ${searchStr}`})
  }
})
module.exports = {statsRouter: router}
