import React from "react"
import {StyleSheet, Text, View} from "react-native"
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker"
import {Button} from "@rneui/themed"
import {REACT_APP_SHOW_DAILY_STATS, REACT_APP_SHOW_AGGREGATE_STATS} from "@env"
import axios from "axios"

const ViewStatsScreen = ({route, navigation}) => {
  const [fromDate, setFromDate] = React.useState(new Date(Date.now()))
  const [toDate, setToDate] = React.useState(new Date(Date.now()))
  const {storeId} = route.params

  const giveMonth = (month) => {
    if (month == "01") {
      return "Jan"
    } else if (month == "02") {
      return "Feb"
    } else if (month == "03") {
      return "Mar"
    } else if (month == "04") {
      return "Apr"
    } else if (month == "05") {
      return "May"
    } else if (month == "06") {
      return "Jun"
    } else if (month == "07") {
      return "Jul"
    } else if (month == "08") {
      return "Aug"
    } else if (month == "09") {
      return "Sep"
    } else if (month == "10") {
      return "Oct"
    } else if (month == "11") {
      return "Nov"
    } else {
      return "Dec"
    }
  }
  const showStats = async () => {
    try {
      const fromDay = fromDate.toISOString().substring(8, 10)
      const fromMonth = fromDate.toISOString().substring(5, 7)
      const fromYear = fromDate.toISOString().substring(0, 4)
      const fromMonthString = giveMonth(fromMonth)

      var fromDateString = fromMonthString + " " + fromDay + " " + fromYear
      var toDateString = ""
      var toDay, toMonth, toYear, toMonthString
      var res

      if (toDate.length != 0) {
        toDay = toDate.toISOString().substring(8, 10)
        toMonth = toDate.toISOString().substring(5, 7)
        toYear = toDate.toISOString().substring(0, 4)
        toMonthString = giveMonth(toMonth)
        toDateString = toMonthString + " " + toDay + " " + toYear

        res = await axios.get(
          `${REACT_APP_SHOW_AGGREGATE_STATS}${storeId}&from=${fromDateString}&to=${toDateString}`
        )
        console.log(res.data)
      } else {
        res = await axios.get(
          `${REACT_APP_SHOW_DAILY_STATS}${storeId}&date=${fromDateString}`
        )
        console.log(res.data)
      }

      const data = [
        {
          id: 1,
          title: "Age Group 11-17",
          color: "#FF4500",
          val: res.data._11To17,
        },
        {
          id: 2,
          title: "Age Group 18-30",
          color: "#87CEEB",
          val: res.data._18To30,
        },
        {
          id: 3,
          title: "Age Group 31-59",
          color: "#4682B4",
          val: res.data._31To59,
        },
        {
          id: 4,
          title: "Age Group above 60",
          color: "#6A5ACD",
          val: res.data._60AndAbove,
        },
        {
          id: 5,
          title: "Time: 12am-3am",
          color: "#FF69B4",
          val: res.data._12amTo3am,
        },
        {
          id: 6,
          title: "Time: 3am-6am",
          color: "#00BFFF",
          val: res.data._3amTo6am,
        },
        {
          id: 7,
          title: "Time: 6am-9am",
          color: "#00FFFF",
          val: res.data._6amTo9am,
        },
        {
          id: 8,
          title: "Time: 9am-12pm",
          color: "#20B2AA",
          val: res.data._9amTo12pm,
        },
        {
          id: 9,
          title: "Time: 12pm-3pm",
          color: "#191970",
          val: res.data._12pmTo3pm,
        },
        {
          id: 10,
          title: "Time: 3pm-6pm",
          color: "#008080",
          val: res.data._3pmTo6pm,
        },
        {
          id: 11,
          title: "Time: 6pm-9pm",
          color: "#008080",
          val: res.data._6pmTo9pm,
        },
        {
          id: 12,
          title: "Time: 9pm-12am",
          color: "#008080",
          val: res.data._9pmTo12am,
        },
        {
          id: 13,
          title: "Males",
          color: "#008080",
          val: res.data.male,
        },
        {
          id: 14,
          title: "Females",
          color: "#008080",
          val: res.data.female,
        },
      ]
      navigation.navigate("Statistics", {stats: data})
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeFromDate = (event, selectedDate) => {
    setFromDate(selectedDate)
  }

  const onChangeToDate = (event, selectedDate) => {
    setToDate(selectedDate)
  }

  const showDatePicker = (mode, fieldType) => {
    DateTimePickerAndroid.open({
      value: fromDate,
      onChange: fieldType === "fromDate" ? onChangeFromDate : onChangeToDate,
      mode,
    })
  }

  const showMode = (fieldType) => {
    fieldType === "fromDate"
      ? showDatePicker("date", "fromDate")
      : showDatePicker("date", "toDate")
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>
          From: {fromDate.toISOString().split("T")[0]}
        </Text>
        <View>
          <Button
            title="From"
            onPress={() => showMode("fromDate")}
            type="clear"
            size="sm"
          />
        </View>

        <Text style={styles.label}>
          To: {toDate.toISOString().split("T")[0]}
        </Text>
        <View>
          <Button
            title="To"
            onPress={() => showMode("toDate")}
            type="clear"
            size="sm"
          />
        </View>
        <View>
          <Button
            title="Give Insights"
            buttonStyle={styles.buttonStyle}
            titleStyle={{fontWeight: "bold"}}
            onPress={() => showStats()}
          />
        </View>
      </View>
    </View>
  )
}

export default ViewStatsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#5b5b5b",
    fontSize: 15,
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
})
