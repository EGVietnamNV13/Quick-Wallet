import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import("./reactotron");

import React, { useEffect, useRef } from "react";
import { View, Platform, LogBox, AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./components/Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { RobotoCondensed_300Light } from "@expo-google-fonts/roboto-condensed";
import { setStatusBarHidden } from "expo-status-bar";
import { checkLanguage, storage } from "./helper";
import { actChangeNotify } from "./store/actions";
import io from "socket.io-client";

LogBox.ignoreLogs([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
  "Require cycles",
  "VirtualizedLists",
  "Warning",
]);
// const connectionConfig = {
//   jsonp: false,
//   reconnection: true,
//   reconnectionDelay: 100,
//   reconnectionAttempts: 100000,
// };
// const socket = io("https://ws.kingdomgame.org", connectionConfig);

// socket.on("notify", ({ titlevi, contentvi, titleen, contenten }) => {
//   const language = store.getState().language || 0;

//   Notifications.presentNotificationAsync({
//     title: checkLanguage({ vi: titlevi, en: titleen }, language),
//     body: checkLanguage({ vi: contentvi, en: contenten }, language),
//   });
//   var noti = storage("noti").getItem();
//   noti.push({ titlevi, contentvi, titleen, contenten, datetime: new Date() });
//   storage("noti", noti).setItem();
//   dispatch(actChangeNotify(noti));
// });
// setStatusBarHidden(false, "none");

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    RobotoCondensed_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  // useEffect(() => {
  //   async function setFirstTime() {
  //     await AsyncStorage.clear();
  //   }

  //   setFirstTime();
  // }, []);

  useEffect(() => {
    async function setFirstTime() {
      await storage("isNotFirstTime", true).setItem();
    }

    setFirstTime();
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["Require cycle"]);
    LogBox.ignoreAllLogs();
  }, []);

  if (fontsLoaded) {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    );
  } else {
    return <View></View>;
  }
}
// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       // alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//   } else {
//     // alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }registerForPushNotificationsAsync()
