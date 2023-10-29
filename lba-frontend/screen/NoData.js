import React from "react"
import {View, StyleSheet, Text} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import LottieView from "lottie-react-native"

const animation = require("../assets/no_data_animation.json")

export default NoDataScreen = ({message}) => {
  return (
    <View style={styles.container}>
      <LottieView source={animation} loop={true} autoPlay />
      <Text style={styles.label}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 20,
    fontWeight: 300,
  },
})
