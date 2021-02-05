import React, { useState, useRef, useEffect, useCallback } from "react";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from "react-native";
import { Header2 } from "../../../../Header";
import { mainStyles } from "../../../../../styles";
import Lock from "../../../../../assets/images/lock-pin.png";
import { LinearGradient } from "expo-linear-gradient";

import { asyncSetPin } from "../../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const dispatch = useDispatch();
  const PIN = useSelector((state) => state.pin);
  const navigation = useNavigation();
  const [Pin1, setPin1] = useState("");
  const [PinBar1, setPinBar1] = useState(null);
  const [PinBar1Focus, setPinBar1Focus] = useState(false);

  const onBlurPinBar1 = useCallback(() => {
    console.log((Pin1 + "").length);
    (Pin1 + "").length === 0 && setPinBar1Focus(false);
  }, [Pin1]);
  const language = useSelector((state) => state.language);
  const handleSubmit = useCallback(() => {
    if (Pin1 === PIN) {
      dispatch(asyncSetPin(false)).then(() => {
        Alert.alert(
          "Unlock PIN",
          checkLanguage(
            {
              vi: "Mã PIN được vô hiệu hóa thành công",
              en: "PIN code disable success",
            },
            language
          )
        );
        navigation.goBack();
      });
    } else {
      Alert.alert(
        "Unlock PIN",
        checkLanguage(
          { vi: "Mã PIN không chính xác", en: "Incorrect PIN code" },
          language
        )
      );
    }
  }, [Pin1, PIN, language]);

  return (
    <>
      <Header2 title="Cài đặt Unlock PIN" />
      <View
        style={[
          mainStyles.container,
          { paddingHorizontal: 16, alignItems: "center" },
        ]}
      >
        <Text
          style={{
            marginTop: 25,
            color: "#ddd9d8",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          {checkLanguage(
            { vi: "Nhập mã PIN hiện tại", en: "Enter current PIN code" },
            language
          )}
        </Text>

        <TouchableOpacity
          disabled={PinBar1Focus}
          activeOpacity={false}
          onPress={() => {
            PinBar1.focus();
            setPinBar1Focus(true);
          }}
          style={{
            position: "relative",
            backgroundColor: "#1d2536",
            height: 55,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            borderRadius: 40,
            marginTop: 32,
          }}
        >
          <Image
            style={{ position: "absolute", left: 19, top: 22 }}
            source={Lock}
          />
          <TouchableOpacity
            onPress={() => {
              setPin1("");
              setPinBar1Focus(false);
            }}
            style={{ position: "absolute", right: 19, padding: 10 }}
          >
            <FontAwesomeIcon color="#fff" icon={faTimesCircle} />
          </TouchableOpacity>
          <Text
            style={{
              color: "#8a8c8e",
              fontSize: 16,
              opacity: PinBar1Focus ? 0 : 1,
            }}
          >
            {checkLanguage(
              { vi: "Nhập mã PIN", en: "Enter PIN code" },
              language
            )}
          </Text>

          <View
            style={{
              opacity: PinBar1Focus ? 1 : 0,
              top: PinBar1Focus ? 0 : -10000,
              position: "absolute",
              width: "60%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SmoothPinCodeInput
              placeholder={
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#8a8c8e",
                  }}
                ></View>
              }
              mask={
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: "#ddd9d8",
                  }}
                ></View>
              }
              restrictToNumbers={true}
              cellSize={12}
              maskDelay={1000}
              password={true}
              cellStyle={null}
              cellStyleFocused={null}
              value={Pin1}
              codeLength={6}
              keyboardType="number-pad"
              onTextChange={(code) => setPin1(code)}
              ref={(value) => setPinBar1(value)}
              inputProps={{ onBlur: onBlurPinBar1 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            marginTop: 10,
            width: "100%",
            height: 47,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            overflow: "hidden",
          }}
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
              {checkLanguage({ vi: "XÁC NHẬN", en: "CONFIRM" }, language)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </>
  );
}
