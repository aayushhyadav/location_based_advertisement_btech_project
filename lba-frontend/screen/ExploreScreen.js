import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React, {useContext} from "react"
import MapView, {Marker} from "react-native-maps"
import useLocation from "../hooks/useLocation"
import axios from "axios"
import {REACT_APP_VIEW_ADS_API} from "@env"
import Context from "../store/context"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const ExploreScreen = ({navigation}) => {
  const data = useLocation()
  const {globalState} = useContext(Context)

  const viewAds = async (index) => {
    try {
      const storeId = data.adData.data.storeIdn[index]
      const res = await axios.get(
        `${REACT_APP_VIEW_ADS_API}id=${storeId}&accType=${globalState.accType}`
      )
      const ads = res.data
      navigation.navigate("ViewAds", {ads, storeId})
    } catch (error) {
      console.log(error)
    }
  }

  if (data.location != undefined && data.adData != undefined) {
    curRegion = {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }

    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={MapView.PROVIDER_GOOGLE}
          region={curRegion}
        >
          {data?.adData?.data?.markers &&
            data.adData.data.markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.coordinates}
                title={marker.title + " - Exclusive Offers!"}
                onPress={() => viewAds(index)}
              >
                <MaterialCommunityIcons name="star" size={48} color="#cc9900" />
              </Marker>
            ))}
        </MapView>
      </View>
    )
  }
  return null
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
