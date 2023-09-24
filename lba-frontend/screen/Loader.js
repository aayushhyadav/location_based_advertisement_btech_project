import React from "react"
import {ActivityIndicator, StyleSheet, Text, View} from "react-native"

export default Loader = ({status}) => {
  return (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size="large" color="#000000" />
      <Text style={styles.indicatorText}>{status}</Text>
    </View>
  )
}

styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorText: {
    fontSize: 15,
    marginTop: 12,
    fontWeight: "bold",
  },
})
