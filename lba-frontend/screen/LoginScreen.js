import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React from "react"
import axios from "axios"
import {Button} from "@rneui/themed"
import {REACT_APP_LOGIN_API} from "@env"
import Context from "../store/context"

const LoginScreen = ({navigation}) => {
  const [emailAddress, onChangeEmailAddress] = React.useState(null)
  const [password, onChangePassword] = React.useState(null)
  const {globalDispatch} = React.useContext(Context)

  const authenticate = async () => {
    try {
      const res = await axios.post(`${REACT_APP_LOGIN_API}`, {
        email: emailAddress,
        password: password,
      })

      globalDispatch({type: "LOGIN", payload: res.data})

      if (res.data.accType == "normal") {
        navigation.navigate("Explore")
      } else {
        navigation.navigate("Dashboard")
      }
    } catch (error) {
      console.log({error, message: error.message})
      alert("Please check your credentials.")
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeEmailAddress(text)}
          value={emailAddress}
          keyboardType="email-address"
          placeholder="Yourid@email.com"
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

        <View style={styles.container2}>
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              buttonStyle={styles.loginButtonStyle}
              titleStyle={{fontWeight: "bold"}}
              onPress={() => authenticate()}
            />
          </View>

          <View style={styles.container3}>
            <Text style={styles.label}>New User ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.newUser}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

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
  heading: {
    fontSize: 20,
    marginBottom: 50,
  },
  label: {
    color: "#5b5b5b",
    fontSize: 12,
    marginTop: 20,
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
  buttonContainer: {
    width: 200,
    marginTop: 50,
  },
  loginButtonStyle: {
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
  },
})
