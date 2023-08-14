import React, {Component} from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native"
import {Card, Image} from "@rneui/themed"

const businessCardBg = require("../assets/business_card_bg.jpg")
const exploreCardBg = require("../assets/explore_card_bg.jpg")
const viewStoresCardBg = require("../assets/view_stores_card_bg.jpg")

const DashboardScreen = ({navigation}) => {
  const initialState = {
    modalVisible: false,
    userSelected: [],
    data: [
      {
        id: 1,
        name: "View Stores",
        image: viewStoresCardBg,
      },
      {
        id: 2,
        name: "Register Business",
        image: businessCardBg,
      },
      {
        id: 3,
        name: "Explore",
        image: exploreCardBg,
      },
    ],
  }

  const [state, setState] = React.useState(initialState)

  const clickEventListener = (item) => {
    if (item.id == 2) {
      navigation.navigate("RegisterBusiness")
    } else if (item.id == 1) {
      navigation.navigate("ViewBusiness")
    } else if (item.id == 3) {
      navigation.navigate("Explore")
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {state.data.map((obj, index) => (
          <TouchableOpacity
            onPress={() => {
              clickEventListener(obj)
            }}
            key={index}
          >
            <Card containerStyle={styles.cardContainer}>
              <Card.Title>{obj.name}</Card.Title>
              <Card.Divider />
              <Image style={styles.image} source={obj.image} />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 200,
    resizeMode: "stretch",
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
})
