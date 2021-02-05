import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { Header2 } from "../../Header";
import { mainStyles, accountStyle } from "../../../styles";
import { accountStyleLight } from "../../../styles/light";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { checkLanguage } from "../../../helper";

export default function App() {
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);
  const navigation = useNavigation();

  // -------------------style------------------------------

  var AccountStyle = display === 1 ? accountStyleLight : accountStyle;

  // ------------------------------------------------------

  return (
    <>
      <Header2
        title={checkLanguage(
          { vi: "Về Quick Wallet", en: `About Quick Wallet` },
          language
        )}
      />
      <View style={[mainStyles.container]}>
        {/* <TouchableOpacity 
                // onPress={()=>navigation.navigate('ChangePass')}
                style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical: 19, paddingHorizontal: 15, position: 'relative'}}>
                    <View style={AccountStyle.maskOpacity} ></View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Image

                            source={require('../../../assets/images/logo.png')}
                        />
                        <View style={{paddingVertical: 10}}>
                            <Text style={{color: display === 1 ?  '#283349' : 'rgba(255,255,255,0.8)'}}>{checkLanguage({vi: 'Phiên bản KDG 1.0', en: `Version KDG 1.0`},language)}</Text>
                        </View>
                    </View>
                </TouchableOpacity> */}
        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Terms", {
                id: "3",
              })
            }
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
                { vi: "Thỏa thuận người dùng", en: `User Agreement` },
                language
              )}
            </Text>
            <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Terms", {
                id: "2",
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
              {checkLanguage(
                { vi: "Chính sách bảo mật", en: `Privacy Policy` },
                language
              )}
            </Text>
            <FontAwesomeIcon color="#8a8c8e" icon={faAngleRight} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
