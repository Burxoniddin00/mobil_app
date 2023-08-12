import * as React from "react";
import { Alert, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profil from "../components/Profil";
import Users from "../components/Users";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { signOut, getAuth } from "firebase/auth";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function AthuRouter() {
  function sidnutUseers() {
    signOut(getAuth())
      .then(() => {
        console.log("users singned out");
      })
      .catch((e) => Alert.alert(e.message));
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Users"
          component={Users}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="users" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={Profil}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="profile" size={size} color={color} />
            ),
            headerRight: () => (
              <AntDesign
                style={{ marginRight: 20 }}
                onPress={() =>
                  Alert.alert("Logout?", "Do you want to log out?", [
                    {
                      text: "Yes",
                      onPress: () => sidnutUseers(),
                    },
                    {
                      text: "No",
                    },
                  ])
                }
                name="logout"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settigs"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
