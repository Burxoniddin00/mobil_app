import { View, Text, Button, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import userLogo from "../../assets/user.png";
import { getDatabase, ref, onValue } from "firebase/database";
export default function Profil() {
  const [users, setUsers] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (isLogin) {
      onValue(ref(getDatabase(), `users/${getAuth().currentUser.uid}`), (u) => {
        setUsers(u);
      });
      setIsLogin(false);
    }
  }, [isLogin]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={
          users && users.profilePicture
            ? { uri: users.profilePicture }
            : userLogo
        }
        style={{ width: 80, height: 80 }}
        alt="userLogo"
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {users && users.val().name}
      </Text>
      <Text>{users && users.val().email}</Text>
      <Text>{users && users.val().date}</Text>
    </View>
  );
}
