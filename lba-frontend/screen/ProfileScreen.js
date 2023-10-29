import React, {useContext} from "react"
import {Text, View, StyleSheet, ScrollView} from "react-native"
import {Card} from "@rneui/themed"
import {MaterialCommunityIcons} from "@expo/vector-icons"
import Context from "../store/context"

const ProfileScreen = ({navigation}) => {
  const {globalState} = useContext(Context)

  return (
    <View>
      <ScrollView>
        <Card containerStyle={styles.cardContainer}>
          <View style={styles.accountContainer}>
            <MaterialCommunityIcons name="account" size={32} />
            <Card.Title>{globalState.name}</Card.Title>
          </View>
        </Card>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Personal Information</Card.Title>
          <Card.Divider />
          <View style={styles.personalInfoContainer}>
            <MaterialCommunityIcons name="email" size={32} />
            <Text>{globalState.email}</Text>

            <MaterialCommunityIcons
              name="cake-variant"
              size={32}
              style={styles.icon}
            />
            <Text>{globalState.dob}</Text>

            <MaterialCommunityIcons
              name={
                globalState.gender === "male" ? "gender-male" : "gender-female"
              }
              size={32}
              style={styles.icon}
            />
            <Text>{globalState.gender}</Text>
          </View>
        </Card>

        <Card containerStyle={styles.cardContainer}>
          <Card.Title>Preferences</Card.Title>
          <Card.Divider />
          <View style={styles.preferencesContainer}>
            <MaterialCommunityIcons name="radius" size={32} />
            <Text>Show ads within {globalState.aor} meters</Text>

            <MaterialCommunityIcons
              name="account-circle"
              size={32}
              style={styles.icon}
            />
            <Text>{globalState.accType} account</Text>
          </View>
        </Card>
      </ScrollView>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
  },
  accountContainer: {
    alignItems: "center",
  },
  personalInfoContainer: {
    alignItems: "center",
  },
  preferencesContainer: {
    alignItems: "center",
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  icon: {
    marginTop: 15,
  },
})
