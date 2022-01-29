const axios = require("axios")
const perturbation = require("./algorithms/geo_indistinguishability")
const cluster = require("./server/model/cluster")

const URL = "http://localhost:4000/proximityServer/checkProximity?"
const URL1 = "http://localhost:3000/test/clusterStats"

describe("utility test", () => {
  it("utility when user is in a high density cluster", async () => {
    const latitude = 41.9471040975
    const longitude = -87.6464345575

    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}`
    )
    const numBusinessWithNoise = []
    const additionalBusinessWithNoise = []

    for (var i = 0; i < 50; i++) {
      const noisyCoords = await perturbation.geoInd(
        0.005915238172934175,
        latitude,
        longitude
      )
      var matches = 0

      const noisyRes = await axios.get(
        `${URL}latitude=${noisyCoords.noisyLat}&longitude=${noisyCoords.noisyLong}`
      )
      for (const store of noisyRes.data.storeNames) {
        if (res.data.storeNames.includes(store)) {
          matches += 1
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
    const latitude = 41.68258267833333
    const longitude = -87.53708482333333

    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}`
    )
    const numBusinessWithNoise = []
    const additionalBusinessWithNoise = []

    for (var i = 0; i < 50; i++) {
      const noisyCoords = await perturbation.geoInd(0.001, latitude, longitude)
      var matches = 0

      const noisyRes = await axios.get(
        `${URL}latitude=${noisyCoords.noisyLat}&longitude=${noisyCoords.noisyLong}`
      )

      if (noisyRes.data.storeNames.length !== 0) {
        for (const store of noisyRes.data.storeNames) {
          if (res.data.storeNames.includes(store)) {
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
