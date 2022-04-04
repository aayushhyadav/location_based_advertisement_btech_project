import {useEffect, useState} from "react"
import * as Location from "expo-location"
import geoInd from "../geo_indistinguishability"
import axios from "axios"
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
    newAor = newAor * 1000 + 500

    const url =
      "http://192.168.0.107:4000/proximityServer/checkProximity?latitude=" +
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
export default useLocation = () => {
  const [location, setLocation] = useState()
  const [adData, setAdData] = useState()

  const getLocation = async () => {
    try {
      const {granted} = await Location.requestBackgroundPermissionsAsync()
      if (!granted) return

      const {
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync()

      setLocation({latitude, longitude})
      const data = await getAdData(0.01, latitude, longitude)
      setAdData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return {adData, location}
}
