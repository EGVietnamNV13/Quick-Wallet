import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from "react-native";
import { Header2 } from "../../../Header";
import { mainStyles } from "../../../../styles";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { checkLanguage } from "../../../../helper";

//{checkLanguage({vi: 'XXXXXXXX', en: `XXXXXXX`},language)}
export default function App() {
  const navigation = useNavigation();

  const screenHeight = useSelector((state) => state.height);
  const [Height, setHeight] = useState(0);
  const [ContentHeight, setContentHeight] = useState(0);
  const [ButtonHeight, setButtonHeight] = useState(0);
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);
  return (
    <>
      <Header2
        setHeight={setHeight}
        title={checkLanguage({ vi: "Xác minh danh tính", en: "KYC" }, language)}
      />
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        style={[
          mainStyles.container,
          { paddingHorizontal: 14, paddingVertical: 8 },
        ]}
      >
        <Text style={[mainStyles.color1, mainStyles.fontsize13]}>
          {checkLanguage(
            {
              vi:
                "Để bắt đầu quá trình xác minh, vui lòng chuẩn bị sẵn các tài liệu nhận dạng chính thức của bạn",
              en:
                "To start the KYC process, please have your official identification documents ready",
            },
            language
          )}
        </Text>
        <Text
          style={[
            mainStyles.color1,
            mainStyles.fontsize13,
            { marginTop: 13, marginBottom: 23 },
          ]}
        >
          {checkLanguage(
            {
              vi: "CMND/ Bằng lái xe/ Hộ chiếu",
              en: `ID card / Driver's license / Passport`,
            },
            language
          )}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient
            start={[0, 1]}
            end={[1, 0]}
            colors={["#edd57d", "#a47b00"]}
            style={{
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>1</Text>
          </LinearGradient>
          <Text
            style={[
              mainStyles.fontsize14,
              mainStyles.color2,
              display === 1 ? { color: "#283349" } : null,
            ]}
          >
            {checkLanguage(
              { vi: "Thông tin cá nhân", en: `Personal information` },
              language
            )}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 14 }}
        >
          <LinearGradient
            start={[0, 1]}
            end={[1, 0]}
            colors={["#edd57d", "#a47b00"]}
            style={{
              width: 30,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginRight: 10,
            }}
          >
            <Text style={{ color: "#fff" }}>2</Text>
          </LinearGradient>
          <Text
            style={[
              mainStyles.fontsize14,
              mainStyles.color2,
              display === 1 ? { color: "#283349" } : null,
            ]}
          >
            {checkLanguage(
              {
                vi: "Upload ảnh CMND/ Bằng lái xe/ Hộ chiếu",
                en: `Upload photo ID card / Driver's license / Passportn`,
              },
              language
            )}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("StartKYC")}
        onLayout={(e) => setButtonHeight(e.nativeEvent.layout.height)}
        style={[
          {
            marginHorizontal: 11,
            flex: 1,
            height: 47,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            overflow: "hidden",
          },
          {
            marginTop:
              screenHeight - ContentHeight - Height - ButtonHeight - 22,
          },
        ]}
      >
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#a47b00", "#edda8b", "#d6b039", "#edda8b", "#a47b00"]}
          style={{
            width: "100%",
            height: 47,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>
            {checkLanguage({ vi: "BẮT ĐẦU", en: `START` }, language)}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
}
