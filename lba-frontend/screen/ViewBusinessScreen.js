import React, {useContext, useEffect, useState} from "react"
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  TextInput,
  Pressable,
  Text,
} from "react-native"
import useViewBusiness from "../hooks/useViewBusiness"
import axios from "axios"
import {REACT_APP_VIEW_ADS_API, REACT_APP_CREATE_ADS_API} from "@env"
import {Card, Image} from "@rneui/base"
import {Dialog} from "@rneui/themed"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import NoDataScreen from "./NoData"
import DatePicker from "../utilComponents/DatePicker"
import Context from "../store/context"
import constants from "../utils/constants"

const RESTAURANT = require("../assets/RESTAURANT.jpg")
const APPAREL = require("../assets/APPAREL.jpg")
const DESSERTS = require("../assets/DESSERTS.jpg")
const ELECTRONICS = require("../assets/ELECTRONICS.jpg")
const FOOTWEAR = require("../assets/FOOTWEAR.jpg")
const GENERAL_STORE = require("../assets/GENERAL_STORE.jpg")
const PHARMACY = require("../assets/PHARMACY.jpg")
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
  const [validTill, setValidTill] = useState(new Date(Date.now()))
  const [newOffer, setNewOffer] = useState(null)
  const [adCreationStatus, setAdCreationStatus] = useState(false)
  const [errorStatus, setErrorStatus] = React.useState(false)
  const [statusMsg, setStatusMsg] = React.useState(constants.GENERIC_ERROR_MSG)
  const {globalState} = useContext(Context)
  const stores = useViewBusiness()

  cardClickEventListener = (item) => {
    Alert.alert(item.id)
  }

  const handleCreateAdDialog = (item) => {
    setDialogVisible(!isDialogVisible)
    item ? setSelectedStoreId(item.id) : setSelectedStoreId(null)

    if (!item) {
      setNewOffer(null)
    }
  }

  const closeStatusDialog = () => setAdCreationStatus(false)

  const createAd = async () => {
    try {
      const ad = {}
      ad.offer = newOffer
      ad.validTill = validTill.toISOString().split("T")[0]

      const res = await axios.post(`${REACT_APP_CREATE_ADS_API}`, {
        id: selectedStoreId,
        ad,
      })
      handleCreateAdDialog(null)
      setAdCreationStatus(true)
      setStatusMsg(constants.ADD_NEW_AD_SUCCESS)
      setErrorStatus(false)
    } catch (error) {
      handleCreateAdDialog(null)
      setAdCreationStatus(true)
      setStatusMsg(error.response.data.Msg)
      setErrorStatus(true)
    }
  }

  const viewAd = async (item) => {
    try {
      const res = await axios.get(
        `${REACT_APP_VIEW_ADS_API}id=${item.id}&accType=${globalState.accType}`
      )
      const ads = res.data
      navigation.navigate("ViewAds", {ads, storeId: item.id})
    } catch (error) {
      console.log(error.response.data)
    }
  }

  const viewStats = (item) => {
    navigation.navigate("ViewStats", {storeId: item.id})
  }

  const onChangeDate = (event, selectedDate) => {
    setValidTill(selectedDate)
  }

  return stores?.data?.length === 0 ? (
    <NoDataScreen message="Register your business today to view your stores!" />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        {stores?.data.map((store, index) => (
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
                <MaterialCommunityIcons
                  name="tag-multiple"
                  size={32}
                  style={{marginLeft: 10}}
                />
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

          <View style={styles.dateContainer}>
            <Text style={styles.label}>
              Offer Valid Till: {validTill.toISOString().split("T")[0]}
            </Text>

            <DatePicker
              title="Select"
              date={validTill}
              onChange={onChangeDate}
            />
          </View>

          <Dialog.Actions>
            <Dialog.Button
              title="Cancel"
              titleStyle={styles.dialogActionButtonTitleStyle}
              onPress={() => handleCreateAdDialog(null)}
            />
            <Dialog.Button
              title="Create"
              titleStyle={styles.dialogActionButtonTitleStyle}
              onPress={() => createAd()}
              disabled={!newOffer}
            />
          </Dialog.Actions>
        </Dialog>

        <StatusDialog
          isVisible={adCreationStatus}
          handleOnBackDropPress={closeStatusDialog}
          title={statusMsg}
          status={errorStatus ? "error" : "success"}
        />
      </ScrollView>
    </View>
  )
}

export default ViewBusinessScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 10,
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
  dateContainer: {
    flexDirection: "row",
  },
  dialogActionButtonTitleStyle: {
    fontWeight: "bold",
    color: "black",
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
  label: {
    color: "#5b5b5b",
    fontSize: 15,
    fontWeight: 500,
    marginTop: 30,
  },
})
