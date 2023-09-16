import React, {useState} from "react"
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native"
import useViewBusiness from "../hooks/useViewBusiness"
import axios from "axios"
import {REACT_APP_VIEW_ADS_API, REACT_APP_CREATE_ADS_API} from "@env"
import {Card, Button, Image} from "@rneui/base"
import {Dialog} from "@rneui/themed"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const RESTAURANT = require("../assets/RESTAURANT.jpg")
const APPAREL = require("../assets/APPAREL.jpg")
const DESSERTS = require("../assets/DESSERTS.jpg")
const ELECTRONICS = require("../assets/ELECTRONICS.jpg")
const FOOTWEAR = require("../assets/FOOTWEAR.jpg")
const GENERAL_STORE = require("../assets/GENERAL_STORE.jpg")
const PHARMACY = require("../assets/PHARMACY.jpg")
const TASK_COMPLETION = require("../assets/task_completion.png")
const DEFAULT = require("../assets/DEFAULT.jpg")

const bgImages = {
  RESTAURANT,
  APPAREL,
  DESSERTS,
  ELECTRONICS,
  FOOTWEAR,
  GENERAL_STORE,
  PHARMACY,
  DEFAULT,
}

const ViewBusinessScreen = ({navigation}) => {
  const [isDialogVisible, setDialogVisible] = useState(false)
  const [selectedStoreId, setSelectedStoreId] = useState(null)
  const [newOffer, setNewOffer] = useState(null)
  const [adCreationStatus, setAdCreationStatus] = useState(false)
  const stores = useViewBusiness()

  cardClickEventListener = (item) => {
    Alert.alert(item.id)
  }

  const handleCreateAdDialog = (item) => {
    setDialogVisible(!isDialogVisible)
    item ? setSelectedStoreId(item.id) : setSelectedStoreId(null)
  }

  const closeStatusDialog = () => setAdCreationStatus(false)

  const createAd = async () => {
    try {
      const ad = {}
      ad.offer = newOffer

      const res = await axios.post(`${REACT_APP_CREATE_ADS_API}`, {
        id: selectedStoreId,
        ad,
      })

      setNewOffer(null)
      handleCreateAdDialog(null)
      setAdCreationStatus(true)
    } catch (error) {
      console.log(error)
    }
  }

  const viewAd = async (item) => {
    try {
      const res = await axios.get(`${REACT_APP_VIEW_ADS_API}` + `${item.id}`)
      const ads = res.data
      navigation.navigate("ViewAds", {ads, storeId: item.id})
    } catch (error) {
      console.log(error)
    }
  }

  const viewStats = (item) => {
    navigation.navigate("ViewStats", {storeId: item.id})
  }

  if (stores != undefined) {
    return (
      <View style={styles.container}>
        <ScrollView>
          {stores.data.map((store, index) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <Card.Title>
                {store.name} - {store.address}
              </Card.Title>
              <Card.Divider />

              <Image
                style={styles.bgImage}
                source={bgImages[store.type] ?? bgImages["DEFAULT"]}
              />

              <View style={styles.buttonContainer}>
                <Pressable onPress={() => handleCreateAdDialog(store)}>
                  <MaterialCommunityIcons name="tag-plus" size={32} />
                </Pressable>

                <Pressable onPress={() => viewAd(store)}>
                  <MaterialCommunityIcons name="tag-multiple" size={32} />
                </Pressable>
              </View>
            </Card>
          ))}

          <Dialog
            isVisible={isDialogVisible}
            onBackdropPress={() => handleCreateAdDialog(null)}
          >
            <Dialog.Title title="Post a new advertisement!" />
            <TextInput
              value={newOffer}
              onChangeText={(text) => setNewOffer(text)}
              style={styles.input}
              placeholder="offer goes here"
            />

            <Dialog.Actions>
              <Dialog.Button
                title="Create"
                titleStyle={{fontWeight: "bold"}}
                onPress={() => createAd()}
                disabled={!newOffer}
                color="black"
              />
              <Dialog.Button
                title="Cancel"
                titleStyle={{fontWeight: "bold"}}
                onPress={() => handleCreateAdDialog(null)}
              />
            </Dialog.Actions>
          </Dialog>

          <Dialog
            isVisible={adCreationStatus}
            onBackdropPress={closeStatusDialog}
          >
            <View style={styles.statusContainer}>
              <Dialog.Title title="Posted Successfully!" />
              <Image source={TASK_COMPLETION} style={styles.statusImage} />
            </View>
          </Dialog>
        </ScrollView>
      </View>
    )
  }
  return null
}

export default ViewBusinessScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonStyle: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
  },
  bgImage: {
    width: 350,
    height: 200,
    resizeMode: "stretch",
  },
  statusImage: {
    width: 30,
    height: 30,
  },
  input: {
    borderColor: "#ffffff",
    width: "100%",
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    fontSize: 15,
    borderBottomColor: "#000000",
  },
})
