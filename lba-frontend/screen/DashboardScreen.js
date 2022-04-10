import React, {Component} from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native"

const DashboardScreen = ({navigation}) => {
  const initialState = {
    modalVisible: false,
    userSelected: [],
    data: [
      {
        id: 1,
        name: "My Profile",
        image: "https://img.icons8.com/clouds/100/000000/employee-card.png",
      },
      {
        id: 2,
        name: "View Stores",
        image: "https://img.icons8.com/color/100/000000/real-estate.png",
      },
      {
        id: 3,
        name: "Register Business",
        image: "https://img.icons8.com/color/100/000000/real-estate.png",
      },
      {
        id: 4,
        name: "Explore",
        image: "https://img.icons8.com/dusk/70/000000/globe-earth.png",
      },
    ],
  }

  const [state, setState] = React.useState(initialState)

  const clickEventListener = (item) => {
    if (item.id == 3) {
      navigation.navigate("RegisterBusiness")
    } else if (item.id == 2) {
      navigation.navigate("ViewBusiness")
    } else if (item.id == 4) {
      navigation.navigate("Explore")
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={state.data}
        keyExtractor={(item) => {
          return item.id
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                clickEventListener(item)
              }}
            >
              <Image style={styles.image} source={{uri: item.image}} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>{item.count}</Text>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => clickEventListener(item)}
                >
                  <Text style={styles.followButtonText}>Explore now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },

  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#6666ff",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
})
