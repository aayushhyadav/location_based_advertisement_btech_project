const axios = require("axios")
const perturbation = require("./algorithms/geo_indistinguishability")

const URL = "http://localhost:4000/proximityServer/checkProximity?"

describe("utility test", () => {
  it("utility when user is in a high density cluster", async () => {
    const latitude = 42
    const longitude = -87.69

    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}`
    )
    const numBusinessWithNoise = []

    for (var i = 0; i < 50; i++) {
      const noisyCoords = await perturbation.geoInd(0.01, latitude, longitude)
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
    }
    console.log(`Actual number - ${res.data.storeNames.length}`)
    console.log(numBusinessWithNoise)
  })

  it("utility when user is in a low density cluster", async () => {
    const latitude = 41.7963
    const longitude = -87.7573

    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}`
    )
    const numBusinessWithNoise = []

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
    }
    console.log(`Actual number - ${res.data.storeNames.length}`)
    console.log(numBusinessWithNoise)
  })
})
