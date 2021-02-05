import React, { useState, useCallback, useEffect } from "react";

import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
export default function App({ title }) {
  const navigation = useNavigation();
  const [ArrowHeight, setArrowHeight] = useState(0);
  const [HeaderHeight, setHeaderHeight] = useState(0);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [handleBackButtonClick]);

  return (
    <>
      <View
        onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
        style={{
          width: "100%",
          height: 68,
          position: "relative",
          backgroundColor: "#642c83",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>{title}</Text>
        <TouchableOpacity
          onLayout={(e) => setArrowHeight(e.nativeEvent.layout.height)}
          style={{
            position: "absolute",
            left: 30,
            top: HeaderHeight / 2 - ArrowHeight / 2,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesomeIcon
            style={{ color: "#fff", fontSize: 40 }}
            icon={faAngleLeft}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
