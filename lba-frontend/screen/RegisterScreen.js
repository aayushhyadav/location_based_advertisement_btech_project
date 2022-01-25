import { StyleSheet, Text, View , TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import DatePicker from 'react-native-datepicker'

const RegisterAccount = (email, password, name) => {
    console.log("Email " + email + "PAssword" + password + "Name" + name)
}

const RegisterScreen = ({ navigation }) => {
          
  const [emailAddress, onChangeEmailAddress] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [username, onChangeUsername] = React.useState(null);
  const [date, onChangeDate] = React.useState("2016-05-15");

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <View>
        <Text style={styles.label}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeUsername(text)}
          value={username}
          keyboardType="default"
          placeholder="sam nolan"
          autoComplete="name"
        />
        <Text style={styles.label}>
          Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeEmailAddress(text)}
          value={emailAddress}
          keyboardType="email-address"
          placeholder="Your@email.com"
          autoComplete="email"
        />
        <Text style={styles.label}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangePassword(text)}
          value={password}
          placeholder="Password"
          autoComplete="password"
          secureTextEntry={true}
        />
        <Text style={styles.label}>
          Date of Birth
        </Text>
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
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
            },
            dateInput: {
                marginLeft: 36
            }
            }}
            onDateChange={(date) => onChangeDate(date)}
        />
      

        <View style={styles.container2}>
          <TouchableOpacity
              style={styles.tombolLogin}
              onPress={() => RegisterAccount(emailAddress,password,username)}
          >
              <Text style={styles.texttombolLogin}>Register</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderColor: '#ffffff',
        width: 300,
        padding:2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        fontSize: 15,
        borderBottomColor:'#000000'
    },
    label: {
        color: '#5b5b5b',
        fontSize: 12,
        marginTop: 20
    },
    texttombolLogin: {
      color: '#ffffff',
      fontSize: 20
    },
    newUser: {
        color: '#404ccf',
        fontSize: 12,
        marginTop: 20
    },
    container2: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tombolLogin: {
      width: 300,
      padding:10,
      backgroundColor: '#404ccf',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      borderColor: '#ffffff',
      borderWidth: 1,
      marginTop:10
    },
});
