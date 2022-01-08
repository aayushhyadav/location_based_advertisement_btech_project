const degreeToRadian = (degree) => (degree * Math.PI) / 180

const computeDistance = (lat1, long1, lat2, long2) => {
  const R = 6371.071
  lat1 = degreeToRadian(lat1)
  long1 = degreeToRadian(long1)
  lat2 = degreeToRadian(lat2)
  long2 = degreeToRadian(long2)

  const diffLat = lat2 - lat1
  const diffLong = long2 - long1

  const distance =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
          Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(diffLong / 2) *
            Math.sin(diffLong / 2)
      )
    )

  return distance
}

console.log(
  computeDistance(19.25455, 72.98165, 19.253658911386747, 72.98202344052585)
)
