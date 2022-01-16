const express = require("express")
const geocode = require("../../server/utility/geocode")
const cluster = require("../../server/model/cluster")
const Store = require("../../server/model/store")
const computeDistance = require("../computeDistance")

const router = express.Router()

router.get("/checkProximity", async (req, res) => {
  try {
    latitude = req.query.latitude
    longitude = req.query.longitude

    const city = await geocode.geocodeToCity(latitude, longitude)
    const cityClusters = await cluster.Cluster.findOne({city})

    var minDistance = Number.MAX_VALUE,
      closestCluster,
      storeNames = [],
      advertisement = []

    for (const cluster of cityClusters.clusters) {
      const curDistance = await computeDistance.computeDistance(
        latitude,
        longitude,
        cluster.centroid[0],
        cluster.centroid[1]
      )

      if (minDistance > curDistance) {
        minDistance = curDistance
        closestCluster = cluster
      }
    }

    for (const storeNum of closestCluster.clusterInd) {
      const store = await Store.Store.findById(cityClusters.poi[storeNum])
      if (store.advertisement.length !== 0) {
        storeNames.push(store.name)
        advertisement.push(store.advertisement)
      }
    }

    res.status(200).send({
      centroid: closestCluster.centroid,
      epsilon: closestCluster.epsilon,
      storeNames,
      advertisement,
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {router}
