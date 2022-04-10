import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React, {useState, useEffect} from "react"
import MapView, {Marker} from "react-native-maps"
import useLocation from "../hooks/useLocation"

const exploreScreen = ({navigation}) => {
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
          {data.adData.data.markers.map((marker) => (
            <Marker
              key={marker}
              coordinate={marker.coordinates}
              title={marker.title + " - Exclusive Offers!"}
              image={require("../assets/store.jpg")}
            ></Marker>
          ))}
        </MapView>
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
