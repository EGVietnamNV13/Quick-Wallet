import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Header2 } from "../../Header";
import { mainStyles, accountStyle } from "../../../styles";
import { accountStyleLight } from "../../../styles/light";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { storage, checkLanguage } from "../../../helper";
import { asyncGetUserbyID } from "../../../store/actions";

export default function App() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const language = useSelector((state) => state.language);

  var loginData = useSelector((state) => state.loginData);

  const [KYCType, setKYCType] = useState();
  //

  const display = useSelector((state) => state.display);

  // -------------------style------------------------------

  var AccountStyle = display === 1 ? accountStyleLight : accountStyle;

  // ------------------------------------------------------

  console.log(loginData.data.user_info.mfa);
  return (
    <>
      <Header2
        title={checkLanguage({ vi: "Bảo mật", en: "Security" }, language)}
      />
      <View style={[mainStyles.container]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePass")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 19,
            paddingHorizontal: 15,
            position: "relative",
          }}
        >
          <View style={AccountStyle.maskOpacity}></View>
          <Text
            style={{
              fontSize: 14,
              color: display === 1 ? "#283349" : "#ddd9d8",
            }}
          >
            {checkLanguage(
              { vi: "Thay đổi mật khẩu", en: "Change password" },
              language
            )}
          </Text>
          <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight} />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={true}
          onPress={() =>
            navigation.navigate("Setting2FA", {
              status2FA: loginData.data.user_info.m2fa,
            })
          }
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 19,
            paddingHorizontal: 15,
            position: "relative",
            borderTopColor: display === 1 ? "#e8e8e8" : "#3b3f49",
            borderTopWidth: 1,
          }}
        >
          <View style={AccountStyle.maskOpacity}></View>
          <Text
            style={{
              fontSize: 14,
              color: display === 1 ? "#283349" : "#ddd9d8",
            }}
          >
            {checkLanguage({ vi: "Cài đặt 2FA", en: "Activate 2FA" }, language)}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
              }}
            >
              {loginData.data.user_info.mfa === 1
                ? checkLanguage(
                    { vi: "Đã kích hoạt", en: "Activated" },
                    language
                  )
                : loginData.data.user_info.mfa === 0
                ? checkLanguage(
                    { vi: "Chưa kích hoạt", en: "Inactivated" },
                    language
                  )
                : ""}
            </Text>
            <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          // disabled={KYCType == 2 || KYCType == 1 ? true : false}
          disabled={true}
          onPress={() => navigation.navigate("KYC")}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 19,
            paddingHorizontal: 15,
            position: "relative",
            borderTopColor: display === 1 ? "#e8e8e8" : "#3b3f49",
            borderTopWidth: 1,
          }}
        >
          <View style={AccountStyle.maskOpacity}></View>
          <Text
            style={{
              fontSize: 14,
              color: display === 1 ? "#283349" : "#ddd9d8",
            }}
          >
            {checkLanguage(
              { vi: "Xác minh danh tính (KYC)", en: "KYC" },
              language
            )}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={
                KYCType == 0
                  ? {
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
                    }
                  : KYCType == 1
                  ? { color: "green" }
                  : KYCType == 2
                  ? {
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
                    }
                  : KYCType == 3
                  ? { color: "red" }
                  : {
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
                    }
              }
            >
              {KYCType == 0
                ? checkLanguage(
                    { vi: "Chưa xác minh", en: "Not verified" },
                    language
                  )
                : KYCType == 1
                ? checkLanguage(
                    { vi: "Đã xác minh", en: "Confirmed" },
                    language
                  )
                : KYCType == 2
                ? checkLanguage(
                    { vi: "Đang chờ duyệt", en: "Pending" },
                    language
                  )
                : KYCType == 3
                ? checkLanguage(
                    { vi: "Bị từ chối  ", en: "Rejected" },
                    language
                  )
                : ""}
            </Text>
            <FontAwesomeIcon
              style={
                KYCType == 0
                  ? {
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
                    }
                  : KYCType == 1
                  ? { color: "green" }
                  : KYCType == 2
                  ? {
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
                    }
                  : KYCType == 3
                  ? { color: "red" }
                  : {
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.5)",
                    }
              }
              icon={faAngleRight}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity 
                onPress={()=>navigation.navigate('Pin')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative',borderTopColor: display === 1  ? '#e8e8e8'  :'#3b3f49', borderTopWidth: 1}}>
                    <View style={AccountStyle.maskOpacity} ></View>
                    <Text style={{fontSize: 14, color: display === 1 ? '#283349'  : '#ddd9d8'}}>{checkLanguage({vi: 'Cài đặt Unlock PIN', en: 'Unlock PIN '},language)}</Text>
                    <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight}/>
                </TouchableOpacity> */}
      </View>
    </>
  );
}
