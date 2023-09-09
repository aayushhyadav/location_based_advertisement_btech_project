import React, {useState, useEffect} from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native"
import {REACT_APP_SHOW_AD_STATS_API} from "@env"
import axios from "axios"

const StatisticsScreen = ({route, navigation}) => {
  const [statsData, setStatsData] = useState()

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

      setStatsData(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      {statsData && (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={statsData}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => {
            return item.id
          }}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  style={[styles.card, {backgroundColor: "#00BFFF"}]}
                >
                  <Text style={[styles.cardImage, {color: "#000000"}]}>
                    {item.val}
                  </Text>
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View
                    style={{alignItems: "center", justifyContent: "center"}}
                  >
                    <Text style={[styles.title, {color: "#00BFFF"}]}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </View>
            )
          }}
        />
      )}
    </View>
  )
}

export default StatisticsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: "center",
  },
  card: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: "#e2e2e2",
    width: 120,
    height: 120,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    alignSelf: "center",
    fontSize: 25,
  },
  title: {
    fontSize: 15,
    flex: 1,
    alignSelf: "center",
    fontWeight: "bold",
  },
})
