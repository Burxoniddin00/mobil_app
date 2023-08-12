import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AppRouters from "./src/Routers/AppRouters";
import AthuRouter from "./src/Routers/AuthRouters";
import "./src/firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  let auth = getAuth();

  useEffect(() => {
    let findOut= onAuthStateChanged(auth ,(user)=>{
      if(user){
        setIsLogin(true)
      }else{
        setIsLogin(false)
      }
    })
    return findOut
  }, [auth]);
  return <>{isLogin ? <AthuRouter /> : <AppRouters />}</>;
}
