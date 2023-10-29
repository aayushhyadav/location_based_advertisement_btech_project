import {StyleSheet, Text, View, TextInput, ScrollView} from "react-native"
import React, {useContext} from "react"
import axios from "axios"
import {REACT_APP_REGISTER_BUSINESS_API} from "@env"
import {Button} from "@rneui/themed"
import {Dropdown} from "react-native-element-dropdown"
import Context from "../store/context"
import Loader from "./Loader"
import StatusDialog from "../utilComponents/StatusDialog"
import constants from "../utils/constants"

const RegisterBusinessScreen = ({navigation}) => {
  const [emailAddress, onChangeEmailAddress] = React.useState(null)
  const [address, onChangeAddress] = React.useState(null)
  const [storeName, onChangeStoreName] = React.useState(null)
  const [city, onChangeCity] = React.useState(null)
  const [contact, onChangeContact] = React.useState(null)
  const [type, onChangeType] = React.useState(null)
  const [newType, onChangeNewType] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState(false)
  const [errorStatus, setErrorStatus] = React.useState(false)
  const [statusMsg, setStatusMsg] = React.useState(constants.GENERIC_ERROR_MSG)
  const {globalState} = useContext(Context)

  const businessOptions = [
    {label: "Restaurant", value: "RESTAURANT"},
    {label: "Footwear", value: "FOOTWEAR"},
    {label: "Electronics", value: "ELECTRONICS"},
    {label: "Desserts", value: "DESSERTS"},
    {label: "Apparel", value: "APPAREL"},
    {label: "Pharmacy", value: "PHARMACY"},
    {label: "General Store", value: "GENERAL_STORE"},
    {label: "Other", value: "OTHER"},
  ]

  const RegisterBusiness = async (
    email,
    name,
    streetAddress,
    city,
    contact
  ) => {
    try {
      const businessType = type === "OTHER" ? newType.toUpperCase() : type
      setLoading(true)

      const res = await axios.post(`${REACT_APP_REGISTER_BUSINESS_API}`, {
        email,
        name,
        streetAddress,
        city,
        contact,
        owner: globalState._id,
        type: businessType,
      })

      setLoading(false)
      setStatus(true)
      setErrorStatus(false)
      setStatusMsg(constants.STORE_SETUP_SUCCESS)
    } catch (error) {
      console.log(error.response.data.Msg)
      setLoading(false)
      setStatus(true)
      setErrorStatus(true)
      setStatusMsg(error.response.data.Msg)
    }
  }

  const closeStatusDialog = () => {
    setStatus(false)
    setStatusMsg(constants.GENERIC_ERROR_MSG)
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader status={constants.SETTING_UP_BUSINESS} />
      ) : (
        <ScrollView style={styles.scrollViewContainer}>
          <Text style={styles.heading}>Lets Onboard Your Business!</Text>
          <View>
            <Text style={styles.label}>Store Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeStoreName(text)}
              value={storeName}
              keyboardType="default"
              placeholder="store name"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeEmailAddress(text)}
              value={emailAddress}
              keyboardType="email-address"
              placeholder="Your@email.com"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeAddress(text)}
              value={address}
              placeholder="Address"
            />

            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeCity(text)}
              value={city}
              placeholder="city"
            />

            <Text style={styles.label}>Contact</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeContact(text)}
              value={contact}
              placeholder="9999999999"
            />

            <Text style={styles.label}>Type of Business</Text>
            <Dropdown
              data={businessOptions}
              labelField="label"
              valueField="value"
              placeholder="Select the type of business"
              placeholderStyle={styles.placeholderStyle}
              onChange={(item) => onChangeType(item.value)}
              value={type}
              selectedTextStyle={styles.selectedDropdownText}
              itemTextStyle={styles.listItemTextStyle}
              maxHeight={200}
            ></Dropdown>

            <Text style={styles.label}>
              Please specify the type of business
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => onChangeNewType(text)}
              value={newType}
              placeholder="restaurant"
              editable={type === "OTHER"}
              selectTextOnFocus={type === "OTHER"}
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Create"
                buttonStyle={styles.createButtonStyle}
                titleStyle={{fontWeight: "bold"}}
                onPress={() =>
                  RegisterBusiness(
                    emailAddress,
                    storeName,
                    address,
                    city,
                    contact
                  )
                }
                disabled={
                  !storeName ||
                  !emailAddress ||
                  !address ||
                  !city ||
                  !contact ||
                  !type ||
                  (type === "OTHER" && !newType)
                }
              />
            </View>
          </View>

          <StatusDialog
            isVisible={status}
            handleOnBackDropPress={closeStatusDialog}
            title={statusMsg}
            status={errorStatus ? "error" : "success"}
          />
        </ScrollView>
      )}
    </View>
  )
}

export default RegisterBusinessScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    marginTop: 60,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderColor: "#ffffff",
    width: 300,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    fontSize: 15,
    borderBottomColor: "#000000",
  },
  label: {
    color: "#5b5b5b",
    fontSize: 12,
    marginTop: 20,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 50,
  },
  createButtonStyle: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 12,
    color: "#5b5b5b",
  },
  selectedDropdownText: {
    fontSize: 15,
  },
  listItemTextStyle: {
    fontSize: 12,
  },
})
