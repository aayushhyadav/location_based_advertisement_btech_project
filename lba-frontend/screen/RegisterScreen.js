import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native"
import React from "react"
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker"
import axios from "axios"
import {Button} from "@rneui/themed"
import {REACT_APP_REGISTER_API} from "@env"

const RegisterScreen = ({navigation}) => {
  const [emailAddress, onChangeEmailAddress] = React.useState(null)
  const [password, onChangePassword] = React.useState(null)
  const [username, onChangeUsername] = React.useState(null)
  const [gender, onChangeGender] = React.useState(null)
  const [aor, onChangeAor] = React.useState(null)
  const [date, setDate] = React.useState(new Date(Date.now()))
  const [isEnabled, setIsEnabled] = React.useState(false)

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

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
        dob,
        accType,
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
      alert("Please check your credentials.")
    }
  }

  const onChangeDate = (event, selectedDate) => {
    setDate(selectedDate)
  }

  const showDatePicker = (mode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeDate,
      mode,
    })
  }

  const showMode = () => {
    showDatePicker("date")
  }

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <View>
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
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeGender(text)}
          value={gender}
          placeholder="Male/Female/Other"
          autoComplete="gender"
        />

        <Text style={styles.label}>View ads within (metres)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeAor(text)}
          value={aor}
          placeholder="500"
        />

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
        <View style={styles.dateViewContainer}>
          <Button title="Select" onPress={showMode} type="clear" size="sm" />
        </View>

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
          />
        </View>
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
})
