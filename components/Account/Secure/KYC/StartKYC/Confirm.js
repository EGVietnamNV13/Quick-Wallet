import React, { useState, useCallback } from "react";

import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import warning from "../../../../../assets/images/warn.png";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { checkLanguage } from "../../../../../helper";
export default function App({
  setOutScrollView,
  SelectedID,
  SelectedCountry,
  SelectedSex,
  Name,
  IDNumber,
}) {
  const navigation = useNavigation();
  const screenHeight = useSelector((state) => state.height);
  const screenWidth = useSelector((state) => state.width);
  const [Height, setHeight] = useState(0);

  const language = useSelector((state) => state.language);
  return (
    <>
      <View
        style={[
          {
            flex: 1,
            flexDirection: "column",
            position: "absolute",
            width: screenWidth,
            height: screenHeight,
            zIndex: 99,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setOutScrollView(null)}
          style={{
            position: "absolute",
            width: screenWidth,
            height: screenHeight,
            top: 0,
            left: 0,
            backgroundColor: "#000",
            opacity: 0.6,
          }}
        ></TouchableOpacity>
        <View
          onLayout={(e) => {
            setHeight(e.nativeEvent.layout.height);
          }}
          style={{
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 300,
            transform: [{ translateX: -150 }, { translateY: -Height / 2 }],
            backgroundColor: "#283349",
            paddingTop: 35,
            paddingHorizontal: 30,
            paddingBottom: 25,
          }}
        >
          <Image source={warning} />
          <Text
            style={{
              color: "#ddd9d8",
              fontSize: 14,
              textAlign: "center",
              marginTop: 30,
            }}
          >
            {checkLanguage(
              {
                vi:
                  "Bạn bắt buộc phải cung cấp tên chính chủ và trùng khớp với thông tin trong CMND/Hộ chiếu?",
                en: `You are required to provide the owner name and match the information in ID card / Driver's license / Passport`,
              },
              language
            )}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 25 }}>
            <TouchableOpacity
              onPress={() => {
                SelectedID === 0 || SelectedID === 1
                  ? navigation.navigate("Upload1", {
                      SelectedID: SelectedID,
                      SelectedCountry: SelectedCountry,
                      SelectedSex: SelectedSex,
                      Name: Name,
                      IDNumber: IDNumber,
                    })
                  : navigation.navigate("Upload2", {
                      SelectedID: SelectedID,
                      SelectedCountry: SelectedCountry,
                      SelectedSex: SelectedSex,
                      Name: Name,
                      IDNumber: IDNumber,
                    });
              }}
              style={{
                flex: 1,
                borderRadius: 8,
                overflow: "hidden",
                width: "50%",
              }}
            >
              <LinearGradient
                start={[0, 1]}
                end={[1, 0]}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
                colors={["#a47b00", "#edda8b", "#d6b039", "#edda8b", "#a47b00"]}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>
                  {checkLanguage({ vi: "XÁC NHẬN", en: "CONFIRM" }, language)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{ width: 8 }}></View>
            <TouchableOpacity
              onPress={() => setOutScrollView(null)}
              style={{
                backgroundColor: "#ddd9d8",
                flex: 1,
                borderRadius: 8,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                height: 40,
              }}
            >
              <Text style={{ color: "#8a8c8e", fontSize: 12 }}>
                {checkLanguage(
                  { vi: "BỔ SUNG THÊM", en: "ADD MORE" },
                  language
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
