const axios = require("axios")
const perturbation = require("./algorithms/geo_indistinguishability")
const computeDistance = require("./proximity_server/computeDistance")
const cluster = require("./server/model/cluster")

const URL = "http://localhost:4000/proximityServer/checkProximity?"
const getClusterURL = "http://localhost:4000/proximityServer/getCluster?"
const URL1 = "http://localhost:5000/test/clusterStats"

describe("utility test", () => {
  it("utility when user is in a high density cluster", async () => {
    const latitude = 41.9483198
    const longitude = -87.64947012
    var areaOfRetrieval = 0.5

    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}&aor=${areaOfRetrieval}`
    )
    const numBusinessWithNoise = []
    const additionalBusinessWithNoise = []
    var clusterId = await axios.get(
      `${getClusterURL}latitude=${latitude}&longitude=${longitude}`
    )
    for (var i = 0; i < 50; i++) {
      //get user cluster number
      do {
        var noisyCoords = await perturbation.geoInd(
          0.00591523817293418,
          latitude,
          longitude
        )
        var perturbedClusterId = await axios.get(
          `${getClusterURL}latitude=${noisyCoords.noisyLat}&longitude=${noisyCoords.noisyLong}`
        )
        console.log(clusterId.data.clusterId, perturbedClusterId.data.clusterId);
      } while(clusterId.data.clusterId != perturbedClusterId.data.clusterId)
      
      var matches = 0
      areaOfRetrieval = 0.5

      areaOfRetrieval += await computeDistance.computeDistance(
        latitude,
        longitude,
        noisyCoords.noisyLat,
        noisyCoords.noisyLong
      )
      const noisyRes = await axios.get(
        `${URL}latitude=${noisyCoords.noisyLat}&longitude=${noisyCoords.noisyLong}&aor=${areaOfRetrieval}`
      )

      if (noisyRes.data.storeNames.length !== 0) {
        for (const store of noisyRes.data.storeNames) {
          if (
            matches < res.data.storeNames.length &&
            res.data.storeNames.includes(store)
          ) {
            matches += 1
          }
        }
      }

      numBusinessWithNoise.push(matches)
      additionalBusinessWithNoise.push(
        noisyRes.data.storeNames.length - matches
      )
    }
    console.log(`\nActual number - ${res.data.storeNames.length}`)
    console.log(`Matching results with perturbation - ${numBusinessWithNoise}`)
    console.log(
      `Extra results with perturbation - ${additionalBusinessWithNoise}\n`
    )
  })

  it("utility when user is in a low density cluster", async () => {
    const latitude = 41.65297177
    const longitude = -87.580187105
    var areaOfRetrieval = 0.5

    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}&aor=${areaOfRetrieval}`
    )

    const numBusinessWithNoise = []
    const additionalBusinessWithNoise = []
    for (var i = 0; i < 50; i++) {
      do {
        var clusterId = await axios.get(
          `${getClusterURL}latitude=${latitude}&longitude=${longitude}`
        )
        var noisyCoords = await perturbation.geoInd(
          0.000504268336128899,
          latitude,
          longitude
        )
        var perturbedClusterId = await axios.get(
          `${getClusterURL}latitude=${noisyCoords.noisyLat}&longitude=${noisyCoords.noisyLong}`
        )
        // console.log(clusterId.data.clusterId, perturbedClusterId.data.clusterId);
      } while(clusterId.data.clusterId != perturbedClusterId.data.clusterId )

      areaOfRetrieval = 0.5
      var matches = 0
      areaOfRetrieval += await computeDistance.computeDistance(
        latitude,
        longitude,
        noisyCoords.noisyLat,
        noisyCoords.noisyLong
      )

      const noisyRes = await axios.get(
        `${URL}latitude=${noisyCoords.noisyLat}&longitude=${noisyCoords.noisyLong}&aor=${areaOfRetrieval}`
      )

      if (noisyRes.data.storeNames.length !== 0) {
        for (const store of noisyRes.data.storeNames) {
          if (
            matches < res.data.storeNames.length &&
            res.data.storeNames.includes(store)
          ) {
            matches += 1
          }
        }
      }

      numBusinessWithNoise.push(matches)
      additionalBusinessWithNoise.push(
        noisyRes.data.storeNames.length - matches
      )
    }
    console.log(`\nActual number - ${res.data.storeNames.length}`)
    console.log(`Matching results with perturbation - ${numBusinessWithNoise}`)
    console.log(
      `Extra results with perturbation - ${additionalBusinessWithNoise}\n`
    )
  })
})
