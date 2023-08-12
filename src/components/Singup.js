import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";

import Logo from "../../assets/logo.png";
import "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";

let date = new Date().toString();


export function Singup(props) {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    try {
      if (!name || !email || !password) {
        Alert.alert("Please fill out the from!");
      } else if (name || email || password) {
        createUserWithEmailAndPassword(getAuth(), email, password)
          .then(() => {
            set(ref(getDatabase(), `users/${getAuth().currentUser.uid}`), {
              name,
              email,
              date,
              profilePicture:''
            });
            Alert.alert("Signuo SuccessFull!");
          })
          .catch((e) => Alert.alert(e.message));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styal.container}>
          <Image style={styal.logImg} source={Logo} alt="Logo" />
          <TextInput
            style={styal.input}
            placeholder="Name"
            onChangeText={(val) => setName(val)}
          />
          <TextInput
            style={styal.input}
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
          />
          <TextInput
            style={styal.input}
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity onPress={registerUser} style={styal.button}>
            <Text style={styal.text}>Sign Up</Text>
          </TouchableOpacity>
          <Text onPress={() => navigation.navigate("Login")} style={styal.link}>
            Need an Login ?
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styal = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    textAlign: "center",
  },
  button: {
    width: 200,
    borderRadius: 10,
    margin: 5,
    padding: 6,
    backgroundColor: "#275dc0",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  logImg: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
});
