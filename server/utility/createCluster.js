const kMeans = require("node-kmeans")
const Store = require("../model/store")

const create = async (cluster) => {
  /*
   *   fetch lat and long from the array of points of interest
   *   pass it to the clustering algo
   *   update the clusters of corresponding city
   */
  const stores = []
  var store,
    numClusters = 3

  for (var i = 0; i < cluster.poi.length; i++) {
    store = await Store.Store.findById(cluster.poi[i])
    stores.push(store)
  }

  const vector = []

  stores.forEach((store) => {
    vector.push([store.location.latitude, store.location.longitude])
  })

  if (numClusters > vector.length) {
    numClusters = vector.length
  }
  kMeans.clusterize(vector, {k: numClusters}, async (error, result) => {
    if (error) {
      console.log(error)
      return
    }
    cluster.clusters = result.map((clusterEntry) => ({...clusterEntry}))
    await cluster.save()
  })
}

module.exports = {create}
