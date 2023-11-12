import AsyncStorage from "@react-native-async-storage/async-storage"
import constants from "./constants"

const getSessionToken = async () => {
  const sessionToken = await AsyncStorage.getItem(constants.SESSION_TOKEN)
  return sessionToken
}

module.exports = {getSessionToken}
