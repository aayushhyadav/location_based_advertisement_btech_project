import React, {Component} from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native"
import useViewBusiness from "../hooks/useViewBusiness"

const ViewBusinessScreen = ({navigation}) => {
  const stores = useViewBusiness()

  cardClickEventListener = (item) => {
    Alert.alert(item.id)
  }
  const createAd = (item) => {
    alert(`Add Advertisements! ${item.id}`)
    const storeId = item.id
  }
  const viewAd = (item) => {
    alert("View Advertisements!")
  }
  const viewStats = (item) => {
    alert("View Stats!")
  }

  if (stores != undefined) {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.notificationList}
          data={stores.data}
          keyExtractor={(item) => {
            return item.id
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[styles.card, {borderColor: "#FF4500"}]}
                onPress={() => {
                  cardClickEventListener(item)
                }}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={[styles.cardContent, styles.tagsContent]}>
                  <Text>{item.address}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => createAd(item)}
                  >
                    <Text style={styles.followButtonText}>New Ad</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => viewAd(item)}
                  >
                    <Text style={styles.followButtonText}>View Ads</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => viewStats(item)}
                  >
                    <Text style={styles.followButtonText}>Statistics</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  }
  return null
}

export default ViewBusinessScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  formContent: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: "wrap",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: "#eee",
    marginTop: 5,
  },
  followButton: {
    margin: 10,
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
    color: "#000000",
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: "row",
  },
})
