const lambert = (x) => {
  const minDiff = 1e-10

  if (x == 0) {
    return 0
  } else if (x == -1 / Math.E) {
    return -1
  } else {
    var q = Math.log(-x)
    var p = 1

    while (Math.abs(p - q) > minDiff) {
      p = (q * q + x / Math.exp(q)) / (q + 1)
      q = (p * p + x / Math.exp(p)) / (p + 1)
    }
    return Math.round(1000000 * q) / 1000000
  }
}

const degreeToRadian = (degree) => (degree * Math.PI) / 180
const radianToDegree = (radian) => (radian * 180) / Math.PI

const geoInd = (epsilon, latitude, longitude) => {
  const earthRadius = 6371e3
  const pi = Math.PI
  const theta = Math.random() * 2 * pi
  const z = Math.random()

  const x = (z - 1) / Math.E
  const radius = (-1 * (lambert(x) + 1)) / epsilon
  const angularDistance = radius / earthRadius

  const latInRadians = degreeToRadian(latitude)
  const longInRadians = degreeToRadian(longitude)

  let noisyLat = Math.asin(
    Math.sin(latInRadians) * Math.cos(angularDistance) +
      Math.cos(latInRadians) * Math.sin(angularDistance) * Math.cos(theta)
  )
  let noisyLong =
    longInRadians +
    Math.atan2(
      Math.sin(theta) * Math.sin(angularDistance) * Math.cos(latInRadians),
      Math.cos(angularDistance) - Math.sin(latInRadians) * Math.sin(noisyLat)
    )

  noisyLat = radianToDegree(noisyLat)
  noisyLong = radianToDegree(noisyLong)

  return {
    noisyLat,
    noisyLong,
  }
}
module.exports = {geoInd}
