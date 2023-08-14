import {useEffect, useState} from "react"
import * as Location from "expo-location"
import geoInd from "../geo_indistinguishability"
import axios from "axios"
import {REACT_APP_CHECK_PROXIMITY_API, REACT_APP_GET_CITY_CLUSTERS} from "@env"
const computeDistance = require("../computeDistance")

const getAdData = async (epsilon, lat, long) => {
  try {
    const noisyCoords = await geoInd(epsilon, lat, long)
    var newAor = await computeDistance.computeDistance(
      lat,
      long,
      noisyCoords.noisyLat,
      noisyCoords.noisyLong
    )
    newAor = newAor * 1000 + 1000

    const url =
      `${REACT_APP_CHECK_PROXIMITY_API}` +
      "latitude=" +
      noisyCoords.noisyLat +
      "&longitude=" +
      noisyCoords.noisyLong +
      "&aor=" +
      newAor

    const nearByStores = await axios.get(url)
    return nearByStores
  } catch (error) {
    console.log(error)
  }
}

const findEpsilon = async (cityClusters, latitude, longitude) => {
  let minDistance = Number.MAX_VALUE
  let epsilon = 0.01

  if (!cityClusters || cityClusters.clusters.length === 0) return epsilon

  for (let i = 0; i < cityClusters.clusters.length; i++) {
    const curDistance = await computeDistance.computeDistance(
      latitude,
      longitude,
      cityClusters.clusters[i].centroid[0],
      cityClusters.clusters[i].centroid[1]
    )
    if (minDistance > curDistance) {
      minDistance = curDistance
      epsilon = cityClusters.epsilon[i]
    }
  }
  return epsilon
}

export default useLocation = () => {
  const [location, setLocation] = useState()
  const [adData, setAdData] = useState()

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync()

      if (status !== "granted") return

      const {
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync()

      setLocation({latitude, longitude})

      const cityObj = await Location.reverseGeocodeAsync({latitude, longitude})
      const cityClusters = await axios.get(
        `${REACT_APP_GET_CITY_CLUSTERS}${cityObj[0].city}`
      )

      const epsilon = cityClusters
        ? await findEpsilon(cityClusters.data, latitude, longitude)
        : 0.01
      const data = await getAdData(epsilon, latitude, longitude)
      setAdData(data)
    } catch (error) {
      console.log({error, message: error.message})
    }
  }
  return {adData, location}
}
