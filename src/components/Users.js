import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { onValue, ref, getDatabase } from "firebase/database";
import userLogo from "../../assets/user.png";
export default function Users() {
  const [loding, setLoding] = useState(true);
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    if (loding) {
      onValue(ref(getDatabase(), `users`), (users) => {
        let userArr = [];
        users.forEach((users) => {
          userArr.push(users.val());
        });
        setUsers(userArr);
      });
      setLoding(false);
    }
  }, loding);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Users.map((Users, i) => (
          <View key={i} style={styles.userContainer}>
            <Image
              source={
                Users.profilePicture ? { uri: Users.profilePicture } : userLogo
              }
              alt="Img"
              style={{ width: 50, height: 50 }}
            />
            <View style={styles.styleBody}>
              <Text style={styles.name}>{Users.name}</Text>
              <Text>{Users.email}</Text>
              <Text>{Users.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    flexDirection: "row",
    gap:15,
    alignItems:'center'
  },
  styleBody:{
    paddingTop:10
  },name:{
    fontSize:18,
    fontWeight:'bold'
  }
});
