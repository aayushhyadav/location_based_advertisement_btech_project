import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  ScrollView,
} from "react-native"
import React, {useContext} from "react"
import DatePicker from "../utilComponents/DatePicker"
import axios from "axios"
import {Button} from "@rneui/themed"
import {Dropdown} from "react-native-element-dropdown"
import {REACT_APP_REGISTER_API} from "@env"
import Context from "../store/context"
import StatusDialog from "../utilComponents/StatusDialog"
import constants from "../utils/constants"

const RegisterScreen = ({navigation}) => {
  const [emailAddress, onChangeEmailAddress] = React.useState(null)
  const [password, onChangePassword] = React.useState(null)
  const [username, onChangeUsername] = React.useState(null)
  const [gender, onChangeGender] = React.useState(null)
  const [aor, onChangeAor] = React.useState(null)
  const [date, setDate] = React.useState(new Date(Date.now()))
  const [isEnabled, setIsEnabled] = React.useState(false)
  const [errorStatus, setErrorStatus] = React.useState(false)
  const [statusMsg, setStatusMsg] = React.useState(constants.GENERIC_ERROR_MSG)
  const {globalDispatch} = useContext(Context)

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const genderOptions = [
    {label: "Male", value: "Male"},
    {label: "Female", value: "Female"},
  ]

  const aorOptions = [
    {label: "Within 2 km", value: "2000"},
    {label: "Within 3 km", value: "3000"},
    {label: "Within 5 km", value: "5000"},
    {label: "Within 10 km", value: "10000"},
  ]

  const RegisterAccount = async (
    email,
    password,
    name,
    gender,
    aor,
    dob,
    accountType
  ) => {
    var accType = "normal"
    try {
      if (accountType) {
        accType = "business"
      }
      const res = await axios.post(`${REACT_APP_REGISTER_API}`, {
        email,
        password,
        name,
        gender,
        radiusOfChoice: aor,
        dob: dob.toISOString().split("T")[0],
        accType,
      })

      globalDispatch({type: "LOGIN", payload: res.data.user})

      if (res.data.user.accType == "normal") {
        navigation.navigate("Explore")
      } else {
        navigation.navigate("Dashboard")
      }
    } catch (error) {
      console.log(error.response.data.Msg)
      setErrorStatus(true)
      setStatusMsg(error.response.data.Msg)
    }
  }

  const onChangeDate = (event, selectedDate) => {
    setDate(selectedDate)
  }

  const closeStatusDialog = () => {
    setErrorStatus(false)
    setStatusMsg(constants.GENERIC_ERROR_MSG)
  }

  return (
    <View style={styles.container}>
      <View>
        <ScrollView style={styles.scrollViewContainer}>
          <Text style={styles.header}>Get Started!</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeUsername(text)}
            value={username}
            keyboardType="default"
            placeholder="sam nolan"
            autoComplete="name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeEmailAddress(text)}
            value={emailAddress}
            keyboardType="email-address"
            placeholder="Your@email.com"
            autoComplete="email"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangePassword(text)}
            value={password}
            placeholder="Password"
            autoComplete="password"
            secureTextEntry={true}
          />

          <Text style={styles.label}>Gender</Text>
          <Dropdown
            data={genderOptions}
            labelField="label"
            valueField="value"
            placeholder="Select"
            placeholderStyle={styles.placeholderStyle}
            onChange={(item) => onChangeGender(item.value)}
            value={gender}
            selectedTextStyle={styles.selectedDropdownText}
            itemTextStyle={styles.listItemTextStyle}
          ></Dropdown>

          <Text style={styles.label}>View ads</Text>
          <Dropdown
            data={aorOptions}
            labelField="label"
            valueField="value"
            placeholder="Select area for viewing ads"
            placeholderStyle={styles.placeholderStyle}
            onChange={(item) => onChangeAor(item.value)}
            value={aor}
            selectedTextStyle={styles.selectedDropdownText}
            itemTextStyle={styles.listItemTextStyle}
            maxHeight={200}
          ></Dropdown>

          <Text style={styles.label}>Register as business owner</Text>
          <View style={styles.toggleContainer}>
            <Switch
              trackColor={{false: "#767577", true: "#81b0ff"}}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <Text style={styles.label}>
            DoB: {date.toISOString().split("T")[0]}
          </Text>
          <DatePicker onChange={onChangeDate} title="Select" date={date} />

          <View style={styles.buttonContainer}>
            <Button
              title="Create"
              buttonStyle={styles.createButtonStyle}
              titleStyle={{fontWeight: "bold"}}
              onPress={() =>
                RegisterAccount(
                  emailAddress,
                  password,
                  username,
                  gender,
                  aor,
                  date,
                  isEnabled
                )
              }
              disabled={
                !username || !emailAddress || !password || !gender || !aor
              }
            />
          </View>

          <StatusDialog
            isVisible={errorStatus}
            handleOnBackDropPress={closeStatusDialog}
            title={statusMsg}
            status="error"
          />
        </ScrollView>
      </View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    marginTop: 40,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
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
    marginTop: 30,
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
  toggleContainer: {
    marginHorizontal: 10,
    marginVertical: -30,
  },
  dateViewContainer: {
    alignItems: "flex-start",
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
