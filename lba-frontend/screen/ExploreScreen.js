import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React from "react"
import MapView from "react-native-maps"

const exploreScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={MapView.PROVIDER_GOOGLE}
      />
    </View>
  )
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
