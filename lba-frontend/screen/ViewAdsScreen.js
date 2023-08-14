import React from "react"
import {StyleSheet, View, ScrollView} from "react-native"
import {Card, Image} from "@rneui/base"

const rewardsBg = require("../assets/rewards.jpg")

const ViewAdsScreen = ({route, navigation}) => {
  const {ads} = route.params

  if (ads != null) {
    return (
      <ScrollView>
        <View style={styles.container}>
          {ads.map((ad, index) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <Card.Title>{ad.offer}</Card.Title>
              <Card.Divider></Card.Divider>
              <Image style={styles.image} source={rewardsBg} />
            </Card>
          ))}
        </View>
      </ScrollView>
    )
  }
}

export default ViewAdsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: "40%",
  },
  image: {
    width: 130,
    height: 100,
    resizeMode: "stretch",
  },
})
