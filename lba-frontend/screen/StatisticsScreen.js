import React, {Component} from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native"

const StatisticsScreen = ({route, navigation}) => {
  const {stats} = route.params

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={stats}
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
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <Text style={[styles.title, {color: "#00BFFF"}]}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </View>
          )
        }}
      />
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
