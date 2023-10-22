import React, {useState, useEffect} from "react"
import {StyleSheet, Text, View, ScrollView} from "react-native"
import {REACT_APP_SHOW_AD_STATS_API} from "@env"
import axios from "axios"
import {Card} from "@rneui/themed"
import NoDataScreen from "./NoData"

const StatisticsScreen = ({route, navigation}) => {
  const [statsData, setStatsData] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchAdStats()
  }, [])

  const {adId} = route.params

  const fetchAdStats = async () => {
    try {
      const res = await axios.get(`${REACT_APP_SHOW_AD_STATS_API}${adId}`)

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
          title: "Age Group 60 and Above",
          color: "#6A5ACD",
          val: res.data._60AndAbove,
        },
        {
          id: 5,
          title: "Males",
          color: "#008080",
          val: res.data.male,
        },
        {
          id: 6,
          title: "Females",
          color: "#008080",
          val: res.data.female,
        },
      ]

      if (res?.data?.Msg === "Access Forbidden due to Privacy Reasons") {
        setError(true)
      }
      setStatsData(data)
    } catch (error) {
      console.log(error)
    }
  }
  return !error ? (
    <View style={styles.container}>
      <ScrollView>
        {statsData &&
          statsData.map((dataPoint, index) => (
            <Card containerStyle={styles.cardContainer} key={index}>
              <Card.Title>{dataPoint.title}</Card.Title>
              <Card.Divider />
              <Text style={styles.label}>{dataPoint.val}</Text>
            </Card>
          ))}
      </ScrollView>
    </View>
  ) : (
    <NoDataScreen message="Access forbidden due to privacy reasons" />
  )
}

export default StatisticsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 10,
  },
  label: {
    fontSize: 30,
    flex: 1,
    alignSelf: "center",
    fontWeight: "bold",
  },
})
