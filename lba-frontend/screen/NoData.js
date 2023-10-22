import React from "react"
import {View, StyleSheet, Text} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

export default NoDataScreen = ({message}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="emoticon-sad" size={80} />
      <Text style={styles.label}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: 500,
  },
})
