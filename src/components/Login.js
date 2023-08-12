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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export function  Login(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logUserIn = () => {
    signInWithEmailAndPassword(getAuth(), email, password).then(() =>
      Alert.alert("Login successFull!")
    ).catch((e)=> Alert.alert(e.message));
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
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
          />
          <TextInput
            style={styal.input}
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity style={styal.button} onPress={logUserIn}>
            <Text style={styal.text}>Login</Text>
          </TouchableOpacity>
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={styal.link}
          >
            Need an account ?
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
