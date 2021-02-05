import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { Header2 } from "../../../../Header";
import { mainStyles, walletStyles } from "../../../../../styles";
import { useNavigation } from "@react-navigation/native";
import Select from "./Select";
import Confirm from "./Confirm";
import { Popup } from "../../../../Popup";
import { checkLanguage } from "../../../../../helper";
export default function App({ setOutScrollView }) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [SelectType, setSelectType] = useState(null);
  const [SelectedCountry, setSelectedCountry] = useState(0);
  const [SelectedID, setSelectedID] = useState(0);
  const [SelectedSex, setSelectedSex] = useState(0);
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);
  const [Name, setName] = useState("");
  const [IDNumber, setIDNumber] = useState("");

  const screenHeight = useSelector((state) => state.height);
  const [Height, setHeight] = useState(0);
  const [ContentHeight, setContentHeight] = useState(0);
  const [ButtonHeight, setButtonHeight] = useState(0);
  useEffect(() => {
    if (SelectType !== null) {
      setOutScrollView(
        <Select
          SelectType={SelectType}
          setSelectType={setSelectType}
          SelectValue={
            SelectType === 0
              ? SelectedCountry
              : SelectType === 1
              ? SelectedID
              : SelectedSex
          }
          setSelectValue={
            SelectType === 0
              ? setSelectedCountry
              : SelectType === 1
              ? setSelectedID
              : setSelectedSex
          }
        />
      );
    } else {
      setOutScrollView(null);
    }
  }, [SelectType]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setTimeout(function () {
      setModalVisible(false);
    }, 1000);
  };

  const handleNext = useCallback(() => {
    if (IDNumber === "" || Name === "") {
      toggleModal();
    } else {
      setOutScrollView(
        <Confirm
          Name={Name}
          IDNumber={IDNumber}
          setOutScrollView={setOutScrollView}
          SelectedID={SelectedID}
          SelectedCountry={SelectedCountry}
          SelectedSex={SelectedSex}
        />
      );
    }

    // navigation.navigate(SelectedID === '')
  }, [SelectedID, SelectedCountry, SelectedSex, Name, IDNumber]);

  return (
    <>
      <Header2
        setHeight={setHeight}
        title={checkLanguage({ vi: "Xác minh danh tính", en: "KYC" }, language)}
      />
      <Popup
        type="failed"
        title={checkLanguage(
          {
            vi: "Vui lòng nhập đầy đủ thông tin",
            en: "Please enter your details below",
          },
          language
        )}
        isModalVisible={isModalVisible}
      />
      <View
        onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}
        style={[
          mainStyles.container,
          { marginHorizontal: 14, marginVertical: 8 },
        ]}
      >
        <Text
          style={[
            mainStyles.color1,
            mainStyles.fontsize13,
            { marginBottom: 7 },
          ]}
        >
          {checkLanguage(
            {
              vi:
                "Chỉ mất khoảng hơn 2 phút. Vui lòng cung cấp thông tin cá nhân đầy đủ bạn để tiếp tục.",
              en:
                "It only takes about 2 minutes. Please provide your personal information to continue.",
            },
            language
          )}
        </Text>

        <Text
          style={[mainStyles.fontsize12, mainStyles.color1, { marginTop: 21 }]}
        >
          {checkLanguage({ vi: "QUỐC GIA", en: "NATION" }, language)}
        </Text>
        <TouchableOpacity
          style={{ marginTop: 8 }}
          onPress={() => setSelectType(0)}
        >
          <View
            style={{
              backgroundColor: display === 1 ? "#fff" : null,
              position: "relative",
              height: 40,
              justifyContent: "center",
              paddingHorizontal: 19,
            }}
          >
            {display === 1 ? null : (
              <View style={walletStyles.maskOpacity}></View>
            )}
            <Text
              style={[
                mainStyles.fontsize14,
                mainStyles.color2,
                { color: display === 1 ? "#283349" : "#fff" },
              ]}
            >
              {SelectedCountry === 0
                ? checkLanguage({ vi: "Việt Nam", en: "Vietnamese" }, language)
                : checkLanguage(
                    { vi: "Quốc gia khác", en: "Others" },
                    language
                  )}
            </Text>
            <FontAwesomeIcon
              size={12}
              color="#8a8c8e"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: [{ translateY: -6 }],
              }}
              icon={faSort}
            />
          </View>
        </TouchableOpacity>

        <Text
          style={[mainStyles.fontsize12, mainStyles.color1, { marginTop: 21 }]}
        >
          {checkLanguage({ vi: "LOẠI GIẤY TỜ", en: "DOCUMENT TYPE" }, language)}
        </Text>
        <TouchableOpacity
          style={{ marginTop: 8 }}
          onPress={() => setSelectType(1)}
        >
          <View
            style={{
              backgroundColor: display === 1 ? "#fff" : null,
              position: "relative",
              height: 40,
              justifyContent: "center",
              paddingHorizontal: 19,
            }}
          >
            {display === 1 ? null : (
              <View style={walletStyles.maskOpacity}></View>
            )}
            <Text
              style={[
                mainStyles.fontsize14,
                mainStyles.color2,
                { color: display === 1 ? "#283349" : "#ffff" },
              ]}
            >
              {SelectedID === 0
                ? checkLanguage(
                    {
                      vi: "CMND/ Bằng lái xe",
                      en: `ID card / Driver's license`,
                    },
                    language
                  )
                : checkLanguage({ vi: "Hộ chiếu", en: `Passport` }, language)}
            </Text>
            <FontAwesomeIcon
              size={12}
              color="#8a8c8e"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: [{ translateY: -6 }],
              }}
              icon={faSort}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={[mainStyles.fontsize12, mainStyles.color1, { marginTop: 21 }]}
        >
          {checkLanguage({ vi: "TÊN", en: "NAME" }, language)}
        </Text>
        <View style={{ marginTop: 8 }}>
          <View
            style={{
              backgroundColor: display === 1 ? "#fff" : null,
              position: "relative",
              height: 40,
              justifyContent: "center",
              paddingHorizontal: 19,
            }}
          >
            {display === 1 ? null : (
              <View style={walletStyles.maskOpacity}></View>
            )}
            {/* <Text style={[mainStyles.fontsize14, mainStyles.color2]}>{SelectedSex === 0 ? 'Nam' : 'Nữ'}</Text> */}
            <TextInput
              onChangeText={(value) => setName(value)}
              placeholder={checkLanguage(
                { vi: "Nhập tên", en: "Enter your name" },
                language
              )}
              placeholderTextColor={display === 1 ? "#8a8c8e" : "#fff"}
              style={[
                mainStyles.fontsize14,
                mainStyles.color2,
                { color: display === 1 ? "#283349" : "#ffff" },
              ]}
            />
          </View>
        </View>

        <Text
          style={[mainStyles.fontsize12, mainStyles.color1, { marginTop: 21 }]}
        >
          {checkLanguage({ vi: "GIỚI TÍNH", en: "GENDER" }, language)}
        </Text>
        <TouchableOpacity
          style={{ marginTop: 8 }}
          onPress={() => setSelectType(2)}
        >
          <View
            style={{
              backgroundColor: display === 1 ? "#fff" : null,
              position: "relative",
              height: 40,
              justifyContent: "center",
              paddingHorizontal: 19,
            }}
          >
            {display === 1 ? null : (
              <View style={walletStyles.maskOpacity}></View>
            )}
            <Text
              style={[
                mainStyles.fontsize14,
                mainStyles.color2,
                { color: display === 1 ? "#283349" : "#fff" },
              ]}
            >
              {SelectedSex === 0
                ? checkLanguage({ vi: "Nam", en: "Male" }, language)
                : checkLanguage({ vi: "Nữ", en: "Female" }, language)}
            </Text>
            <FontAwesomeIcon
              size={12}
              color="#8a8c8e"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: [{ translateY: -6 }],
              }}
              icon={faSort}
            />
          </View>
        </TouchableOpacity>
        <Text
          style={[mainStyles.fontsize12, mainStyles.color1, { marginTop: 21 }]}
        >
          {SelectedID === 0
            ? checkLanguage(
                {
                  vi: "SỐ CMND/BẰNG LÁI XE",
                  en: `ID CARD / DRIVER'S LICENSE NUMBER`,
                },
                language
              )
            : checkLanguage({ vi: "HỘ CHIẾU", en: "PASSPORT" }, language)}
        </Text>
        <View style={{ marginTop: 8 }}>
          <View
            style={{
              backgroundColor: display === 1 ? "#fff" : null,
              position: "relative",
              height: 40,
              justifyContent: "center",
              paddingHorizontal: 19,
            }}
          >
            {display === 1 ? null : (
              <View style={walletStyles.maskOpacity}></View>
            )}
            {/* <Text style={[mainStyles.fontsize14, mainStyles.color2]}>{SelectedSex === 0 ? 'Nam' : 'Nữ'}</Text> */}
            <TextInput
              onChangeText={(value) => setIDNumber(value)}
              placeholder={
                SelectedID === 0
                  ? checkLanguage(
                      {
                        vi: "Nhập Số CMND/Bằng lái xe",
                        en: `Enter ID card / Driver's license number`,
                      },
                      language
                    )
                  : checkLanguage({ vi: "Hộ chiếu", en: `Passport` }, language)
              }
              placeholderTextColor={display === 1 ? "#8a8c8e" : "#fff"}
              style={[
                mainStyles.fontsize14,
                mainStyles.color2,
                { color: display === 1 ? "#283349" : "#fff" },
              ]}
            />
          </View>
        </View>
      </View>

      {SelectType === null && (
        <TouchableOpacity
          onPress={handleNext}
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
              {checkLanguage({ vi: "Tiếp theo", en: "Continue" }, language)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
}
