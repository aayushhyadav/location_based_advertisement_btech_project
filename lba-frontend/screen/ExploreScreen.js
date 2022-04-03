import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React from "react"
import MapView from "react-native-maps"
import useLocation from "../hooks/useLocation"
import geoInd from "../geo_indistinguishability"
import axios from "axios"
const computeDistance = require("../computeDistance")

const exploreScreen = ({navigation}) => {
  const obfuscate = async (epsilon, lat, long) => {
    try {
      const noisyCoords = await geoInd(epsilon, lat, long)
      const newAor =
        (await computeDistance.computeDistance(
          lat,
          long,
          noisyCoords.noisyLat,
          noisyCoords.noisyLong
        )) *
          1000 +
        500
      const url =
        "http://192.168.0.107:4000/proximityServer/checkProximity?latitude=" +
        noisyCoords.noisyLat +
        "&longitude=" +
        noisyCoords.noisyLong +
        "&aor=" +
        newAor

      const nearByStores = await axios.get(url)
      console.log(nearByStores.data)
    } catch (error) {
      console.log(error)
    }
  }

  const location = useLocation()
  if (location != undefined) {
    curRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }
    obfuscate(0.01, location.latitude, location.longitude)
    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={MapView.PROVIDER_GOOGLE}
          region={curRegion}
        />
      </View>
    )
  }
  return null
}

export default exploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
