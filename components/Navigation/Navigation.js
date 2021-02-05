import "react-native-gesture-handler";
import React, { useEffect, useMemo, useCallback } from "react";
import { View, Dimensions, Platform, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";

import { useSelector, useDispatch } from "react-redux";
import {
  actChangeScreenHeight,
  actChangeScreenWidth,
  asyncGetRouters,
  asyncLogin,
} from "../../store/actions";

import Maincomponent from "../Maincontainer";
import { storage } from "../../helper";

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

export default function App() {
  const { top, bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();

  const ScreenWidth = useSelector((state) => state.width);
  const ScreenHeight = useSelector((state) => state.height);

  const Routers = useSelector((state) => state.routers);

  // const checkRefreshToken = useCallback(async ()=>{
  //   var loginTime = await storage('loginTime').getItem()
  //   var currTime = new Date().getTime()
  //   if(loginTime && currTime - loginTime >= 1200000){
  //     var loginInfo = await storage('loginInfo').getItem()
  //     if(loginInfo.email && loginInfo.password){
  //       dispatch(asyncLogin(loginInfo))
  //     }
  //   }
  //   setInterval(async () => {
  //     var loginInfo = await storage('loginInfo').getItem()
  //     if(loginInfo.email && loginInfo.password){
  //       dispatch(asyncLogin(loginInfo))
  //     }
  //   }, 10000);
  // },[])

  useMemo(() => {
    dispatch(asyncGetRouters());
    // checkRefreshToken()
  }, []);

  useEffect(() => {
    dispatch(actChangeScreenWidth(Dimensions.get("screen").width));
    dispatch(
      actChangeScreenHeight(
        Platform.OS !== "android"
          ? Dimensions.get("window").height - bottom
          : Dimensions.get("window").height
      )
    );
  }, []);
  return (
    <SafeAreaView>
      <View
        style={[
          {
            width: ScreenWidth,
            height: ScreenHeight,
          },
        ]}
      >
        {Routers && Routers.length !== 0 && (
          <NavigationContainer>
            <Navigator
              screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator:
                  CardStyleInterpolators.forScaleFromCenterAndroid,

                // transitionSpec: {
                //   open: config,
                //   close: closeConfig,
                // },
                // } }}>
              }}
            >
              {Routers &&
                Routers.map((Router) => {
                  if (Router.needInMain) {
                    return (
                      <Screen
                        key={Router.name && Router.name}
                        name={Router.name && Router.name}
                        // options={{ mode: card }}
                      >
                        {(props) => (
                          <Maincomponent
                            {...props}
                            reqLogin={Router.reqLogin}
                            Component={Router.render && Router.render}
                          ></Maincomponent>
                        )}
                      </Screen>
                    );
                  } else {
                    return (
                      <Screen
                        key={Router.name}
                        name={Router.name}
                        component={Router.render}
                      />
                    );
                  }
                })}
            </Navigator>
          </NavigationContainer>
        )}
      </View>
    </SafeAreaView>
  );
}
