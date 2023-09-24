import React from "react"
import {StyleSheet, View} from "react-native"
import {Button} from "@rneui/themed"
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker"

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
      <Button title={title} onPress={showMode} type="clear" size="sm" />
    </View>
  )
}

export default DatePicker

const styles = StyleSheet.create({
  dateViewContainer: {
    alignItems: "flex-start",
  },
})
