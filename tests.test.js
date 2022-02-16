const axios = require("axios")
const perturbation = require("./algorithms/geo_indistinguishability")
const computeDistance = require("./proximity_server/computeDistance")
const cluster = require("./server/model/cluster")

const URL = "http://localhost:4000/proximityServer/checkProximity?"
const URL1 = "http://localhost:3000/test/clusterStats"

describe("utility test", () => {
  it("utility when user is in a high density cluster", async () => {
    const latitude = 41.94814
    const longitude = -87.64492
    var areaOfRetrieval = 0.5

    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}&aor=${areaOfRetrieval}`
    )
    const numBusinessWithNoise = []
    const additionalBusinessWithNoise = []

    for (var i = 0; i < 50; i++) {
      areaOfRetrieval = 0.5

      const noisyCoords = await perturbation.geoInd(
        0.005915238172934175,
        latitude,
        longitude
      )

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

  it("utility when user is in a low density cluster", async () => {
    const latitude = 41.65508
    const longitude = -87.60755
    var areaOfRetrieval = 0.5

    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}&aor=${areaOfRetrieval}`
    )

    const numBusinessWithNoise = []
    const additionalBusinessWithNoise = []

    for (var i = 0; i < 50; i++) {
      areaOfRetrieval = 0.5

      const noisyCoords = await perturbation.geoInd(
        0.0005042683361288988,
        latitude,
        longitude
      )
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

describe("checking average cluster density, size, max density and min density", () => {
  it("measures avg cluster size and density, finds max and min density", async () => {
    const clusterStats = await axios.get(URL1)
    console.log(
      `\nAverage cluster size (in sq km) - ${clusterStats.data.meanSize}\n`
    )
    console.log(
      `Average cluster density per sq km - ${clusterStats.data.meanDensity}\n`
    )
    console.log(
      `Max Density - ${clusterStats.data.maxDensity}, Min Density - ${clusterStats.data.minDensity}\n`
    )
    console.log(
      `Max Density Cluster - ${clusterStats.data.maxDensityCluster}, Min Density Cluster - ${clusterStats.data.minDensityCluster}\n`
    )
    console.log(`Density of each cluster - ${clusterStats.data.density}\n`)
  })
})
