const kMeans = require("node-kmeans")
const Store = require("../model/store")
const pythonScript = require("./execOptimumK")
const computeDistance = require("../../proximity_server/computeDistance")
/**
 *
 * @param {*} cluster, denotes set of all businesses in a city
 *  generates new clusters and updates the database
 */
const create = async (cluster) => {
  const stores = []
  var store,
    numClusters = 1

  for (var i = 0; i < cluster.poi.length; i++) {
    store = await Store.Store.findById(cluster.poi[i])
    stores.push(store)
  }

  const vector = []
  var lat = "",
    long = "",
    mean = 0

  stores.forEach((store) => {
    vector.push([store.latitude, store.longitude])
    lat += store.latitude.toString() + ","
    long += store.longitude.toString() + ","
  })

  lat = lat.substring(0, lat.length - 1)
  long = long.substring(0, long.length - 1)

  if (stores.length > 1) {
    numClusters = await pythonScript.exec(lat, long)
  }

  kMeans.clusterize(vector, {k: numClusters}, async (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    cluster.clusters = result.map((clusterEntry) => ({
      ...clusterEntry,
    }))

    cluster.clusterSize = []

    for (const c of cluster.clusters) {
      const lat1 = c.centroid[0]
      const long1 = c.centroid[1]
      mean = 0
      for (const coords of c.cluster) {
        const lat2 = coords[0]
        const long2 = coords[1]
        mean += await computeDistance.computeDistance(lat1, long1, lat2, long2)
      }
      cluster.clusterSize.push(mean / c.clusterInd.length)
    }

    await cluster.save()
  })
}

module.exports = {create}
