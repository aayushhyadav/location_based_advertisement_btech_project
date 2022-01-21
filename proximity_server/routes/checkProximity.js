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
    const cityClusters = await cluster.Cluster.findOne({city: city})

    if (city !== "Chicago") {
      res.status(200).send({
        storeNames: [],
        advertisement: [],
      })
      return
    }

    var closestClusters = [],
      storeNames = [],
      advertisement = [],
      storeIds = [],
      minDistance = Number.MAX_VALUE,
      closestCluster

    for (const cluster of cityClusters.clusters) {
      const curDistance = await computeDistance.computeDistance(
        latitude,
        longitude,
        cluster.centroid[0],
        cluster.centroid[1]
      )

      if (curDistance <= 2) {
        closestClusters.push(cluster)
      }
      if (minDistance > curDistance) {
        minDistance = curDistance
        closestCluster = cluster
      }
    }

    if (closestClusters.length == 0) {
      closestClusters.push(closestCluster)
    }

    for (const cluster of closestClusters) {
      for (var i = 0; i < cluster.clusterInd.length; i++) {
        const curDistance = await computeDistance.computeDistance(
          latitude,
          longitude,
          cluster.cluster[i][0],
          cluster.cluster[i][1]
        )

        if (curDistance <= 0.5) {
          storeIds.push(cityClusters.poi[cluster.clusterInd[i]])
        }
      }
    }

    for (const storeNum of storeIds) {
      const store = await Store.Store.findById(storeNum)
      if (store.advertisement.length !== 0) {
        advertisement.push(store.advertisement)
      }
      storeNames.push(store.name)
    }

    // if (closestClusters.length == 1) {
    //   epsilon = closestClusters[0].epsilon
    // }

    res.status(200).send({
      storeNames,
      advertisement,
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {router}
