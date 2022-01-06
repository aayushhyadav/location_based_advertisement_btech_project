const kMeans = require("node-kmeans")
const Store = require("../model/store")
const pythonScript = require("./execOptimumK")

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
  var lat = ""
  var long = ""

  stores.forEach((store) => {
    vector.push([store.location.latitude, store.location.longitude])
    lat += store.location.latitude.toString() + ","
    long += store.location.longitude.toString() + ","
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
      epsilon: 1,
    }))
    await cluster.save()
  })
}

module.exports = {create}
