import React from "react"
import {Dialog} from "@rneui/themed"
import {View, StyleSheet, Text} from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

export default StatusDialog = ({
  isVisible,
  handleOnBackDropPress,
  title,
  status,
}) => {
  return (
    <Dialog isVisible={isVisible} onBackdropPress={handleOnBackDropPress}>
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
