import {StatusBar} from "expo-status-bar"
import {StyleSheet, Text, View} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import LoginScreen from "./screen/LoginScreen"
import RegisterScreen from "./screen/RegisterScreen"
import ExploreScreen from "./screen/ExploreScreen"
import DashboardScreen from "./screen/DashboardScreen"
import RegisterBusinessScreen from "./screen/RegisterBusinessScreen"
import ViewBusinessScreen from "./screen/ViewBusinessScreen"
import ViewAdsScreen from "./screen/ViewAdsScreen"
import StatisticsScreen from "./screen/StatisticsScreen"
import ProfileScreen from "./screen/ProfileScreen"
import HelpScreen from "./screen/HelpScreen"
import GlobalStateProvider from "./store/GlobalStateProvider"
import {useContext, useEffect} from "react"
import Context from "./store/context"
import {MaterialCommunityIcons} from "@expo/vector-icons"

const Stack = createNativeStackNavigator()
const DashboardStack = createNativeStackNavigator()
const ExploreStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const BusinessUserTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => getIcon(route, focused),
      tabBarActiveTintColor: "#000000",
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen
      name="Home"
      component={DashboardStackScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Help" component={HelpScreen} />
  </Tab.Navigator>
)

const NormalUserTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => getIcon(route, focused),
      tabBarActiveTintColor: "#000000",
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen
      name="ExploreHome"
      component={ExploreStackScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Help" component={HelpScreen} />
  </Tab.Navigator>
)

const DashboardStackScreen = () => {
  const {globalState} = useContext(Context)

  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="MyDashboard"
        component={DashboardScreen}
        options={{title: `Welcome ${globalState.name}!`}}
      />
      <DashboardStack.Screen
        name="ViewBusiness"
        component={ViewBusinessScreen}
        options={{title: `Welcome ${globalState.name}!`}}
      />
      <DashboardStack.Screen
        name="ViewAds"
        component={ViewAdsScreen}
        options={{title: `Welcome ${globalState.name}!`}}
      />
      <DashboardStack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{title: `Welcome ${globalState.name}!`}}
      />
      <DashboardStack.Screen
        name="RegisterBusiness"
        component={RegisterBusinessScreen}
        options={{title: `Welcome ${globalState.name}!`}}
      />
      <DashboardStack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{title: `Welcome ${globalState.name}!`}}
      />
    </DashboardStack.Navigator>
  )
}

const ExploreStackScreen = () => {
  const {globalState} = useContext(Context)

  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="MyExplore"
        component={ExploreScreen}
        options={{title: `Welcome ${globalState.name}!`}}
      />
      <ExploreStack.Screen
        name="ViewAds"
        component={ViewAdsScreen}
        options={{title: `Welcome ${globalState.name}!`}}
      />
    </ExploreStack.Navigator>
  )
}

const getIcon = (route, focused) => {
  let iconName

  if (route.name === "Home") {
    iconName = focused ? "home" : "home-outline"
  } else if (route.name === "Profile") {
    iconName = focused ? "account" : "account-outline"
  } else if (route.name === "Help") {
    iconName = focused ? "help-circle" : "help-circle-outline"
  } else if (route.name === "ExploreHome") {
    iconName = focused ? "map-marker-radius" : "map-marker-radius-outline"
  }
  return <MaterialCommunityIcons name={iconName} color="#000000" size={32} />
}

export default function App() {
  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{title: "Portal to exclusive offers!"}}
          />
          <Stack.Screen
            name="Dashboard"
            component={BusinessUserTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Explore"
            component={NormalUserTabNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
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
