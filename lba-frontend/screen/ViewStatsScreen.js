import React, {Component} from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native"
import DatePicker from "react-native-datepicker"
import {SHOW_DAILY_STATS, SHOW_AGGREGATE_STATS} from "@env"
import axios from "axios"

const ViewStatsScreen = ({route, navigation}) => {
  const [fromDate, onChangeFromDate] = React.useState("")
  const [toDate, onChangeToDate] = React.useState("")
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
    const fromDay = fromDate.substring(8, 10)
    const fromMonth = fromDate.substring(5, 7)
    const fromYear = fromDate.substring(0, 4)
    const fromMonthString = giveMonth(fromMonth)

    var fromDateString = fromMonthString + " " + fromDay + " " + fromYear
    var toDateString = ""
    var toDay, toMonth, toYear, toMonthString
    var res

    if (toDate.length != 0) {
      toDay = toDate.substring(8, 10)
      toMonth = toDate.substring(5, 7)
      toYear = toDate.substring(0, 4)
      toMonthString = giveMonth(toMonth)
      toDateString = toMonthString + " " + toDay + " " + toYear
      try {
        res = await axios.get(
          `${SHOW_AGGREGATE_STATS}${storeId}&from=${fromDateString}&to=${toDateString}`
        )
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        res = await axios.get(
          `${SHOW_DAILY_STATS}${storeId}&date=${fromDateString}`
        )
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
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
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>From</Text>
        <DatePicker
          style={{width: 300}}
          date={fromDate}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => onChangeFromDate(date)}
        />
        <Text style={styles.label}>To</Text>
        <DatePicker
          style={{width: 300}}
          date={toDate}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => onChangeToDate(date)}
        />
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.tombolStats}
            onPress={() => showStats()}
          >
            <Text style={styles.texttombolStats}>Show Statistics</Text>
          </TouchableOpacity>
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
  container2: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#5b5b5b",
    fontSize: 12,
    marginTop: 20,
  },
  texttombolStats: {
    color: "#ffffff",
    fontSize: 15,
  },
  tombolStats: {
    width: 300,
    padding: 10,
    backgroundColor: "#404ccf",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderColor: "#ffffff",
    borderWidth: 1,
    marginTop: 10,
  },
})
