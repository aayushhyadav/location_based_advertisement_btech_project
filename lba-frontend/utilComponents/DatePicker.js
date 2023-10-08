import React from "react"
import {StyleSheet, View, Pressable} from "react-native"
import {Button} from "@rneui/themed"
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const DatePicker = ({onChange, title, date}) => {
  const showDatePicker = (mode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode,
      display: "spinner",
    })
  }

  const showMode = () => {
    showDatePicker("date")
  }

  return (
    <View style={styles.dateViewContainer}>
      <Pressable onPress={showMode}>
        <MaterialCommunityIcons name="calendar" size={32} />
      </Pressable>
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  dateViewContainer: {
    marginTop: 30,
    marginLeft: 15,
  },
})
