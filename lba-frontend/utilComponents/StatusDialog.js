import React, {useState} from "react"
import {Dialog} from "@rneui/themed"
import {View, StyleSheet, Text} from "react-native"
import LottieView from "lottie-react-native"

const errorAnimation = require("../assets/error_animation.json")
const successAnimation = require("../assets/success_animation.json")

export default StatusDialog = ({
  isVisible,
  handleOnBackDropPress,
  title,
  status,
  isMapView = false,
}) => {
  const [visibility, setVisibility] = useState(isVisible)

  if (isMapView) {
    setTimeout(() => {
      setVisibility(false)
    }, 5000)
  }

  return (
    <Dialog
      isVisible={isMapView ? visibility : isVisible}
      onBackdropPress={handleOnBackDropPress ?? null}
    >
      <View style={styles.statusContainer}>
        <Text style={styles.label}>{title}</Text>
        {status !== "success" ? (
          <LottieView
            style={{width: "30%"}}
            source={errorAnimation}
            loop={true}
            autoPlay
          />
        ) : (
          <LottieView
            style={{width: "30%"}}
            source={successAnimation}
            loop={true}
            autoPlay
          />
        )}
      </View>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  statusContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
  },
  statusIcon: {
    marginTop: 10,
  },
})
