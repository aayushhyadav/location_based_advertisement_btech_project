import {StatusBar} from "expo-status-bar"
import {StyleSheet, Text, View} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import LoginScreen from "./screen/LoginScreen"
import RegisterScreen from "./screen/RegisterScreen"
import ExploreScreen from "./screen/ExploreScreen"
import DashboardScreen from "./screen/DashboardScreen"
import RegisterBusinessScreen from "./screen/RegisterBusinessScreen"
import ViewBusinessScreen from "./screen/ViewBusinessScreen"
import ViewAdsScreen from "./screen/ViewAdsScreen"
import ViewStatsScreen from "./screen/ViewStatsScreen"
import StatisticsScreen from "./screen/StatisticsScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen
          name="RegisterBusiness"
          component={RegisterBusinessScreen}
        />
        <Stack.Screen name="ViewBusiness" component={ViewBusinessScreen} />
        <Stack.Screen name="ViewAds" component={ViewAdsScreen} />
        <Stack.Screen name="ViewStats" component={ViewStatsScreen} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
