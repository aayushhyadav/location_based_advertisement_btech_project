const express = require("express")
const Cluster = require("../model/cluster")

const router = express.Router()

router.get("/clusterStats", async (req, res) => {
  try {
    const c = await Cluster.Cluster.findOne({city: "Chicago"})
    var meanSize = 0,
      meanDensity = 0,
      maxDensity = Number.MIN_VALUE,
      minDensity = Number.MAX_VALUE,
      maxDensityCluster,
      minDensityCluster

    for (const size of c.clusterSize) {
      meanSize += size
    }

    for (var i = 0; i < c.clusters.length; i++) {
      const numBusiness = c.clusters[i].clusterInd.length
      if (maxDensity < numBusiness / c.clusterSize[i]) {
        maxDensity = numBusiness / c.clusterSize[i]
        maxDensityCluster = i
      }
      if (minDensity > numBusiness / c.clusterSize[i]) {
        minDensity = numBusiness / c.clusterSize[i]
        minDensityCluster = i
      }
      meanDensity += numBusiness / c.clusterSize[i]
    }

    meanSize /= c.clusterSize.length
    meanDensity /= c.clusters.length

    res
      .status(200)
      .send({
        meanSize,
        meanDensity,
        maxDensity,
        maxDensityCluster,
        minDensity,
        minDensityCluster,
      })
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = {testRouter: router}
