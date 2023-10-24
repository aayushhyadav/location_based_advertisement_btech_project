import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React, {useContext} from "react"
import MapView, {Marker} from "react-native-maps"
import useLocation from "../hooks/useLocation"
import axios from "axios"
import {REACT_APP_VIEW_ADS_API} from "@env"
import Context from "../store/context"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import Loader from "./Loader"
import StatusDialog from "../utilComponents/StatusDialog"

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

  const getStoresCentroid = (stores) => {
    let avgLatitude = 0
    let avgLongitude = 0

    for (const store of stores) {
      avgLatitude += store.coordinates.latitude
      avgLongitude += store.coordinates.longitude
    }
    return {avgLatitude, avgLongitude}
  }

  if (data?.location != undefined && data?.adData != undefined) {
    const {avgLatitude, avgLongitude} = getStoresCentroid(
      data.adData.data.markers
    )

    curRegion = {
      latitude: avgLatitude === 0 ? data.location.latitude : avgLatitude,
      longitude: avgLongitude === 0 ? data.location.longitude : avgLongitude,
      latitudeDelta: data.newAor ? data.newAor / 111 : 0.01,
      longitudeDelta: data.newAor ? data.newAor / 111 : 0.01,
    }

    return (
      <View style={styles.container}>
        <MapView
          style={StyleSheet.absoluteFill}
          provider={MapView.PROVIDER_GOOGLE}
          region={curRegion}
        >
          {data?.adData?.data?.markers.map((marker, index) => (
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

        {data?.adData?.data?.markers?.length === 0 && (
          <StatusDialog
            isVisible={true}
            title="We could not find any offers around you"
            status="error"
            isMapView={true}
          />
        )}
      </View>
    )
  }
  return <Loader status="Searching exciting offers..." />
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
