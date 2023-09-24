import React, {useContext, useState, useEffect} from "react"
import {StyleSheet, View, ScrollView, Pressable, Text} from "react-native"
import {Card, Image} from "@rneui/base"
import {Button} from "@rneui/themed"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import Context from "../store/context"
import axios from "axios"
import {REACT_APP_UPDATE_ADS_API, REACT_APP_UPDATE_STATS_API} from "@env"

const rewardsBg = require("../assets/rewards.jpg")

const ViewAdsScreen = ({route, navigation}) => {
  const [like, setLike] = useState({})
  const [likeCount, setLikeCount] = useState({})
  const {globalState} = useContext(Context)

  useEffect(() => {
    if (ads !== null && globalState.accType === "normal") {
      initLikeValues()
    }
  }, [ads])

  const {ads, storeId} = route.params

  const initLikeValues = () => {
    let adNum
    const newLikeCountObj = {}
    const newLikeObj = {}

    for (adNum = 0; adNum < ads.length; adNum++) {
      newLikeCountObj[adNum] = ads[adNum].likedBy.length
      newLikeObj[adNum] = hasUserLiked(ads[adNum].likedBy)
    }

    setLikeCount(newLikeCountObj)
    setLike(newLikeObj)
  }

  const hasUserLiked = (users) => users.includes(globalState._id)

  const onChangeLike = (adId, adIndex) => {
    updateLikedByList(adId, !like[adIndex])
    updateStats(adId, !like[adIndex])

    !like[adIndex]
      ? setLikeCount({...likeCount, [adIndex]: likeCount[adIndex] + 1})
      : setLikeCount({...likeCount, [adIndex]: likeCount[adIndex] - 1})

    setLike({...like, [adIndex]: !like[adIndex]})
  }

  const updateLikedByList = async (adId, likeValue) => {
    try {
      const res = await axios.post(`${REACT_APP_UPDATE_ADS_API}`, {
        storeId,
        adId,
        likeValue,
        userId: globalState._id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateStats = async (adId, likeValue) => {
    try {
      const res = await axios.post(`${REACT_APP_UPDATE_STATS_API}`, {
        adId,
        likeValue,
        userId: globalState._id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  if (ads != null) {
    return (
      <ScrollView>
        <View style={styles.container}>
          {ads.map((ad, index) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <Card.Title>{ad.offer}</Card.Title>
              <Card.Divider></Card.Divider>
              <Image style={styles.image} source={rewardsBg} />

              {globalState.accType === "normal" && (
                <View style={styles.likesContainer}>
                  <Pressable onPress={() => onChangeLike(ad._id, index)}>
                    <MaterialCommunityIcons
                      name={like[index] ? "heart" : "heart-outline"}
                      size={24}
                      color={like[index] ? "red" : "black"}
                    />
                  </Pressable>

                  <Text style={styles.label}>
                    {likeCount[index]
                      ? `${likeCount[index]} people like this`
                      : ""}
                  </Text>
                </View>
              )}

              {globalState.accType === "business" && (
                <View style={styles.likesContainer}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Statistics", {adId: ad._id})
                    }
                  >
                    <MaterialCommunityIcons name="google-analytics" size={32} />
                  </Pressable>

                  <Text style={{...styles.label, marginTop: 10}}>
                    Get Insights!
                  </Text>
                </View>
              )}
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
    width: "42%",
    elevation: 10,
  },
  likesContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    width: 140,
    height: 100,
    resizeMode: "stretch",
  },
  label: {
    color: "#5b5b5b",
    fontSize: 12,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  statsButtonStyle: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
})
