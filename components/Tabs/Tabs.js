import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TABS } from "../../routers";
import Maincomponent from "../Maincontainer";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;
export default function App() {
  const display = useSelector((state) => state.display);
  const language = useSelector((state) => state.language);
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: "#642c83",
        inactiveTintColor: "#8a8c8e",
        style: {
          backgroundColor: display === 1 ? "#ffff" : "#283349",
          borderTopWidth: display === 1 ? 1 : 0,
        },
      }}
    >
      {TABS.map((tab) => (
        <Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={
                  focused
                    ? display === 1
                      ? tab.logoActiveLight
                      : tab.logoActive
                    : tab.logo
                }
              />
            ),
            title: language === 0 ? tab.titleVi : tab.title,
          }}
          key={tab.name}
          name={tab.name}
        >
          {(props) => (
            <Maincomponent
              {...props}
              reqLogin={tab.reqLogin}
              Component={tab.render}
            ></Maincomponent>
          )}
        </Screen>
      ))}
    </Navigator>
  );
}
