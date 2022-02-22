const express = require("express")
const geocode = require("../../server/utility/geocode")
const cluster = require("../../server/model/cluster")
const Store = require("../../server/model/store")
const computeDistance = require("../computeDistance")

const router = express.Router()

router.get("/getCluster", async (req, res) => {
  try {
    latitude = req.query.latitude
    longitude = req.query.longitude
    //user's current location city
    const city = await geocode.geocodeToCity(latitude, longitude)
   //all the clusters within that city
    const cityClusters = await cluster.Cluster.findOne({city: "Chicago"})
    
    var clusterId;
    var minDistance = Number.MAX_VALUE;
    if (cityClusters !== null) {
      for ( let i = 0; i < cityClusters.clusters.length; i++) {
        const curDistance = await computeDistance.computeDistance(
          latitude,
          longitude,
          cityClusters.clusters[i].centroid[0],
          cityClusters.clusters[i].centroid[1],
        )
        if (minDistance > curDistance) {
          minDistance = curDistance;
          clusterId = i;
        }
      }
    }
    res.status(200).send({
      clusterId,
    })
  } catch (error) {
    res.status(400).send(error)
  }
})
module.exports = {router}
