import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React, {useState, useEffect} from "react"
import MapView, {Marker} from "react-native-maps"
import useLocation from "../hooks/useLocation"

const mapMarker = require("../assets/discount_marker.png")

const ExploreScreen = ({navigation}) => {
  const data = useLocation()

  if (data.location != undefined && data.adData != undefined) {
    curRegion = {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }

    console.log(data)
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
