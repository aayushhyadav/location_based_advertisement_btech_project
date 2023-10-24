import React, {useState} from "react"
import {Dialog} from "@rneui/themed"
import {View, StyleSheet, Text} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

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
        <MaterialCommunityIcons
          name={status === "success" ? "check-circle" : "alert"}
          size={32}
          style={styles.statusIcon}
          color={status === "success" ? "gold" : "red"}
        />
      </View>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
  },
  statusIcon: {
    marginTop: 10,
  },
})
