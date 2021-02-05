import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import DepositIcon from "../../assets/images/depositIcon.png";
import WithDrawIcon from "../../assets/images/withdrawIcon.png";
import NoneIcon from "../../assets/images/question-marks.png";
import { checkLanguage } from "../../helper";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App({
  toPress,
  type,
  datetime,
  status,
  value,
  coin_name,
}) {
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: display === 1 ? "#ffff" : "rgba(28,38,59,0.7)",
          borderRadius: 5,
          padding: 15,
          borderBottomWidth: 1,
          borderColor: display === 1 ? "#f1f0ef" : "rgba(114,118,125,0.8)",
        }}
      >
        <TouchableOpacity onPress={toPress}>
          {/* //        <View style={AccountStyle.itemHeader}>
                        //     <Image source={support}/>
                        //     <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Hỗ trợ', en: 'Support'},language)}</Text>
                        // </View> */}
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                style={{
                  width: 35,
                  height: 35,
                }}
                source={
                  type === "deposit"
                    ? DepositIcon
                    : type === "withdraw"
                    ? WithDrawIcon
                    : NoneIcon
                }
              />
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text
                style={{
                  color: display === 1 ? "#283349" : "rgba(255,255,255,0.8)",
                  fontSize: 14,
                }}
              >
                {type === "deposit"
                  ? checkLanguage({ vi: "Nạp", en: "Deposit" }, language)
                  : type === "withdraw"
                  ? checkLanguage({ vi: "Rút", en: "Withdraw" }, language)
                  : "Không xác định"}
              </Text>
              <Text
                style={{
                  color: display === 1 ? "#989a9c" : "rgba(255,255,255,0.5)",
                  fontSize: 12,
                }}
              >
                {datetime}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              color: display === 1 ? "#283349" : "rgba(255,255,255,0.8)",
              fontSize: 14,
            }}
          >
            {type === "deposit"
              ? `+ ${value} ${coin_name}`
              : type === "withdraw"
              ? `- ${value} ${coin_name}`
              : "Không xác định"}
          </Text>
          <Text
            style={{
              color:
                status === "success"
                  ? "#26a65b"
                  : status === "failed"
                  ? "#e11f2e"
                  : "rgba(255,255,255,0.5)",
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            {status === "success"
              ? checkLanguage({ vi: "Thành công", en: "Successful" }, language)
              : status === "failed"
              ? checkLanguage({ vi: "Thất bại", en: "Failed" }, language)
              : checkLanguage({ vi: "Đang chờ", en: "Waiting" }, language)}
          </Text>
        </View>
      </View>
    </>
  );
}
