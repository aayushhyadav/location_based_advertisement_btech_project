import {StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native"
import React from "react"
import axios from "axios"
import {REGISTER_BUSINESS_API} from "@env"

const RegisterBusiness = async (email, name, streetAddress, city, contact) => {
  try {
    const res = await axios.post(`${REGISTER_BUSINESS_API}`, {
      email,
      name,
      streetAddress,
      city,
      contact,
      owner: "62481ba3f3fef3b62b3b420a",
    })
    console.log(res.data)
    alert("Store Registered!")
  } catch (error) {
    console.log(error)
    alert("Please check your details.")
  }
}

const RegisterBusinessScreen = ({navigation}) => {
  const [emailAddress, onChangeEmailAddress] = React.useState(null)
  const [address, onChangeAddress] = React.useState(null)
  const [storeName, onChangeStoreName] = React.useState(null)
  const [city, onChangeCity] = React.useState(null)
  const [contact, onChangeContact] = React.useState(null)

  return (
    <View style={styles.container}>
      <Text>Register Business</Text>
      <View>
        <Text style={styles.label}>Store Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeStoreName(text)}
          value={storeName}
          keyboardType="default"
          placeholder="Puma"
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
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeAddress(text)}
          value={address}
          placeholder="Address"
          autoComplete="address"
        />
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeCity(text)}
          value={city}
          placeholder="Pune"
          autoComplete="city"
        />
        <Text style={styles.label}>Contact</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeContact(text)}
          value={contact}
          placeholder="1234567890"
        />

        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.tombolLogin}
            onPress={() =>
              RegisterBusiness(emailAddress, storeName, address, city, contact)
            }
          >
            <Text style={styles.texttombolLogin}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
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
