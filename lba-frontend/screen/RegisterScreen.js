import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native"
import React from "react"
import DatePicker from "react-native-datepicker"
import axios from "axios"
import {REGISTER_API} from "@env"

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
    const res = await axios.post(`${REGISTER_API}`, {
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

const RegisterScreen = ({navigation}) => {
  const [emailAddress, onChangeEmailAddress] = React.useState(null)
  const [password, onChangePassword] = React.useState(null)
  const [username, onChangeUsername] = React.useState(null)
  const [gender, onChangeGender] = React.useState(null)
  const [aor, onChangeAor] = React.useState(null)
  const [date, onChangeDate] = React.useState("2016-05-15")
  const [isEnabled, setIsEnabled] = React.useState(false)

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

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
        <Text style={styles.toggleSwitch}>
          Register as business owner
          <Switch
            trackColor={{false: "#767577", true: "#81b0ff"}}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Text>
        <Text style={styles.label}>Date of Birth</Text>
        <DatePicker
          style={{width: 300}}
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => onChangeDate(date)}
        />

        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.tombolLogin}
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
          >
            <Text style={styles.texttombolLogin}>Register</Text>
          </TouchableOpacity>
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
    marginTop: 20,
  },
  texttombolLogin: {
    color: "#ffffff",
    fontSize: 20,
  },
  newUser: {
    color: "#404ccf",
    fontSize: 12,
    marginTop: 20,
  },
  container2: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tombolLogin: {
    width: 300,
    padding: 10,
    backgroundColor: "#404ccf",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderColor: "#ffffff",
    borderWidth: 1,
    marginTop: 10,
  },
  toggleSwitch: {
    color: "#5b5b5b",
    fontSize: 12,
    marginTop: 10,
  },
})
