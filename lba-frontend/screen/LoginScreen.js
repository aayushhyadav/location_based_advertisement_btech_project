import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React from "react"
import axios from "axios"

const LoginScreen = ({navigation}) => {
  const [emailAddress, onChangeEmailAddress] = React.useState(null)
  const [password, onChangePassword] = React.useState(null)

  const authenticate = async () => {
    try {
      const res = await axios.post("http://192.168.0.107:3000/auth/userLogin", {
        email: emailAddress,
        password: password,
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
      alert("Please check your credentials.")
    }
  }
  return (
    <View style={styles.container}>
      <Text>Login</Text>
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
          <TouchableOpacity
            style={styles.tombolLogin}
            onPress={() => authenticate()}
          >
            <Text style={styles.texttombolLogin}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.label}>Forgot Password?</Text>
          </TouchableOpacity>
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
})
