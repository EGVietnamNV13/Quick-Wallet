import React, { useState, useCallback, useEffect, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image, BackHandler } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import openscaner from "../../assets/images/openscaner.png";
import logout from "../../assets/images/logout.png";
import { useSelector } from "react-redux";
export default function App({ title, setHeight, toPress, type }) {
  const navigation = useNavigation();
  const [ArrowHeight, setArrowHeight] = useState(0);
  const [HeaderHeight, setHeaderHeight] = useState(0);

  const display = useSelector((state) => state.display);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }

  useMemo(() => {
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
      {display === 1 ? (
        <View
          onLayout={(e) => {
            setHeaderHeight(e.nativeEvent.layout.height);
            if (setHeight) setHeight(e.nativeEvent.layout.height);
          }}
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
              width: "10%",
              position: "absolute",
              left: 0,
              top: HeaderHeight / 2 - ArrowHeight / 2,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={{ padding: 30, paddingRight: 50 }}>
              <FontAwesomeIcon
                size={20}
                style={{ color: "#fff", fontSize: 40 }}
                icon={faAngleLeft}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: HeaderHeight / 1 - ArrowHeight / 2,
            }}
            onPress={toPress}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={type === "logout" ? logout : openscaner}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#e5be50", "#ecda8b", "#a47b00"]}
          onLayout={(e) => {
            setHeaderHeight(e.nativeEvent.layout.height);
            if (setHeight) setHeight(e.nativeEvent.layout.height);
          }}
          style={{
            width: "100%",
            height: 68,
            position: "relative",
            backgroundColor: "#2e394f",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>{title}</Text>
          <TouchableOpacity
            onLayout={(e) => setArrowHeight(e.nativeEvent.layout.height)}
            style={{
              width: "10%",
              position: "absolute",
              left: 0,
              top: HeaderHeight / 2 - ArrowHeight / 2,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={{ padding: 30, paddingRight: 50 }}>
              <FontAwesomeIcon
                size={20}
                style={{ color: "#fff", fontSize: 40 }}
                icon={faAngleLeft}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
              top: HeaderHeight / 1 - ArrowHeight / 2,
            }}
            onPress={toPress}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={type === "logout" ? logout : openscaner}
            />
          </TouchableOpacity>
        </LinearGradient>
      )}
    </>
  );
}
