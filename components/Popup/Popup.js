import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-native-modal";
import { View, Text, Platform } from "react-native";
import { Dimensions } from "react-native";

export default function App({ title, isModalVisible, type }) {
  const dimen = Dimensions.get("window");
  const isIphoneTaiTho =
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896);
  return (
    <>
      <Modal
        animationIn="fadeInDown"
        animationOut="fadeOut"
        hasBackdrop={false}
        animationInTiming={50}
        isVisible={isModalVisible}
      >
        <View
          style={{
            backgroundColor: type === "success" ? "#642c83" : "#f54336",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: isIphoneTaiTho ? 40 : 10,
            right: 10,
            paddingVertical: 5,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff", paddingHorizontal: 10 }}>{title}</Text>
        </View>
      </Modal>
    </>
  );
}
