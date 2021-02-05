import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-native-modal";
import { View, Text, Platform, Image } from "react-native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import socket from "../../socket";

export default function App({
  title,
  isModalVisible,
  type,
  onBackdropPress,
  onBackButtonPress,
  onModalShow,
  children,
}) {
  const dimen = Dimensions.get("window");

  return (
    <>
      <Modal
        animationIn="fadeInDown"
        animationOut="fadeOutDown"
        animationInTiming={60}
        animationOutTiming={60}
        isVisible={isModalVisible}
        onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackButtonPress}
        onModalShow={onModalShow}
      >
        <View
          style={{
            backgroundColor: type === "success" ? "#ffff" : "#f54336",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "17%",
            width: "100%",
            paddingTop: 30,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#000",
              paddingHorizontal: 10,
              fontWeight: "bold",
              fontSize: 16,
              paddingBottom: 20,
            }}
          >
            Chọn coin
          </Text>
          {children}
        </View>
      </Modal>
    </>
  );
}
