import React from "react"
import {ScrollView, Text, View, StyleSheet} from "react-native"
import {Image} from "@rneui/themed"

const aboutImg = require("../assets/help_screen_about_img.jpg")
const locationSearchImg = require("../assets/help_screen_location_search_img.jpg")
const privacyImg = require("../assets/help_screen_privacy_img.jpg")
const businessSetupImg = require("../assets/help_screen_business_setup_img.jpg")
const adStatsImg = require("../assets/help_screen_ad_stats_img.jpg")

const HelpScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>About SafeDeals</Text>
        <View style={styles.questionContainer}>
          <Image source={aboutImg} style={styles.img} />
          <Text style={styles.body}>
            SafeDeals is a platform where you can find exciting deals around you
            at a single place.
          </Text>
        </View>

        <Text style={styles.header}>How does SafeDeals find these offers?</Text>
        <View style={styles.questionContainer}>
          <Text style={styles.body}>
            SafeDeals utilizes your location data and takes the proximity range
            specified by you into consideration to discover offers.
          </Text>
          <Image source={locationSearchImg} style={styles.img} />
        </View>

        <Text style={styles.header}>
          How does SafeDeals leverage your location data?
        </Text>
        <View style={styles.questionContainer}>
          <Image source={privacyImg} style={styles.img} />
          <Text style={styles.body}>
            SafeDeals does not store your location data on the servers. Your
            location data never leaves your device. We incorporate methods to
            obfuscate your location data to preserve privacy before sending it
            to the server.
          </Text>
        </View>

        <Text style={styles.header}>
          Register your business to post offers!
        </Text>
        <View style={styles.questionContainer}>
          <Text style={styles.body}>
            While registering you can select the account type as "business" to
            setup a business account. Once your business account is setup, you
            can add your stores and post offers to attract potential customers.
          </Text>
          <Image source={businessSetupImg} style={styles.img} />
        </View>

        <Text style={styles.header}>Ads statistics</Text>
        <View style={styles.questionContainer}>
          <Image source={adStatsImg} style={styles.img} />
          <Text style={styles.body}>
            SafeDeals allows business owners to view statistics for every ad
            they post. This data corresponds to the number of people who have
            shown interest in your ad. Please note that the numbers are just an
            approximation and do not refer to the exact values. For privacy
            reasons, there is limited access to this data.
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#ffffff",
  },
  container: {
    padding: 10,
  },
  questionContainer: {
    marginBottom: 25,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  header: {
    fontSize: 20,
    fontWeight: 400,
  },
  body: {
    fontSize: 15,
    flex: 0.9,
  },
  img: {
    width: 100,
    height: 110,
  },
})
export default HelpScreen
