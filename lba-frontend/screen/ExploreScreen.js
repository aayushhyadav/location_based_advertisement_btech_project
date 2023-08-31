import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React, {useState, useEffect} from "react"
import MapView, {Marker} from "react-native-maps"
import useLocation from "../hooks/useLocation"
import axios from "axios"
import {REACT_APP_VIEW_ADS_API} from "@env"

const mapMarker = require("../assets/discount_marker.png")

const ExploreScreen = ({navigation}) => {
  const data = useLocation()

  const viewAds = async (index) => {
    try {
      const storeId = data.adData.data.storeIdn[index]
      const res = await axios.get(`${REACT_APP_VIEW_ADS_API}` + `${storeId}`)
      const ads = res.data
      navigation.navigate("ViewAds", {ads: ads})
    } catch (error) {
      console.log(error)
    }
  }

  if (data.location != undefined && data.adData != undefined) {
    curRegion = {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }

    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={MapView.PROVIDER_GOOGLE}
          region={curRegion}
        >
          {data.adData.data.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinates}
              title={marker.title + " - Exclusive Offers!"}
              image={mapMarker}
              onPress={() => viewAds(index)}
            ></Marker>
          ))}
        </MapView>
      </View>
    )
  }
  return null
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
