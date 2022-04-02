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
    areaOfRetrieval = req.query.aor

    const city = await geocode.geocodeToCity(latitude, longitude)
    const cityClusters = await cluster.Cluster.findOne({city: city})

    var closestClusters = [],
      storeNames = [],
      advertisement = [],
      storeIds = [],
      storeIdn = [],
      epsilon = -1,
      minDistance = Number.MAX_VALUE,
      closestCluster

    /*
     *  finds clusters within 3km proximity
     *  if none then, finds the closest cluster
     */
    if (cityClusters !== null) {
      for (const cluster of cityClusters.clusters) {
        const curDistance = await computeDistance.computeDistance(
          latitude,
          longitude,
          cluster.centroid[0],
          cluster.centroid[1]
        )

        if (curDistance <= 3) {
          closestClusters.push(cluster)

          if (minDistance > curDistance) {
            minDistance = curDistance
            closestCluster = cluster
          }
        }
      }

      /* find stores within 500m proximity of user's location */
      if (closestClusters.length != 0) {
        for (const cluster of closestClusters) {
          for (var i = 0; i < cluster.clusterInd.length; i++) {
            const curDistance = await computeDistance.computeDistance(
              latitude,
              longitude,
              cluster.cluster[i][0],
              cluster.cluster[i][1]
            )

            if (curDistance <= areaOfRetrieval / 1000) {
              storeIds.push(cityClusters.poi[cluster.clusterInd[i]])
            }
          }
        }
      }

      /* add the stores which have advertisements */
      for (const storeNum of storeIds) {
        const store = await Store.Store.findById(storeNum)
        if (store.advertisement.length !== 0) {
          storeIdn.push(storeNum)
          storeNames.push(store.name)
          advertisement.push(store.advertisement)
        }
      }

      if (closestClusters.length != 0) {
        epsilon = closestCluster.epsilon
      }
    }
    res.status(200).send({
      epsilon,
      storeIdn,
      storeNames,
      advertisement,
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {router}
