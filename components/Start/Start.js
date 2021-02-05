import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { mainStyles as styles } from "../../styles/";
import { startScreenStyle as styles2 } from "../../styles/";
import { transition } from "../../helper";
import { useSelector } from "react-redux";
import Button from "./Button";

import AppIntroSlider from "react-native-app-intro-slider";

import kwtext from "../../assets/images/kwtext.png";
import securetext from "../../assets/images/securetext.png";
import mainImage2 from "../../assets/images/main-image-2.png";
import multitext from "../../assets/images/multitext.png";
import mainImage3 from "../../assets/images/main-image-3.png";

import easytext from "../../assets/images/easytext.png";
import mainImage4 from "../../assets/images/main-image-4.png";

export default function App() {
  const ScreenWidth = useSelector((state) => state.width);
  const ScreenHeight = useSelector((state) => state.height);

  const [ShowRealApp, setShowRealApp] = useState(false);
  const [Skip, setSkip] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    // After user skip the intro slides. Show real app through
    // navigation or simply by controlling state
    setShowRealApp(true);
  };

  const renderItem = (item) => {
    return (
      <View
        style={{
          width: item.width,
        }}
      >
        {item.key === "s1" ? (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: ScreenWidth * 0.08,
                color: "#fff",
                marginTop: ScreenHeight * 0.33283,
                fontFamily: "RobotoCondensed_300Light",
              }}
            >
              Welcome to
            </Text>
            <Image
              source={kwtext}
              style={[styles2.image, { width: ScreenWidth * 0.5 }]}
            ></Image>
            <Text style={[styles2.text, { marginTop: ScreenHeight * 0.03448 }]}>
              King Wallet meets all the demands
            </Text>
            <Text style={[styles2.text]}>of the users</Text>
          </View>
        ) : item.key === "s2" ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={mainImage2}
              style={[
                styles2.image,
                {
                  width: ScreenHeight * 0.4497,
                  height: ScreenHeight * 0.4497,
                  marginTop: ScreenHeight * 0.1079,
                },
              ]}
            ></Image>
            <Image
              source={securetext}
              style={[
                styles2.image,
                {
                  width: ScreenWidth * 0.384 * 1.5,
                  marginTop: ScreenHeight * 0.0374812,
                },
              ]}
            ></Image>
            <Text style={[styles2.text, { marginTop: ScreenHeight * 0.02248 }]}>
              Multi-layer security mechanism ensures
            </Text>
            <Text style={styles2.text}>
              safe and stable assets and transactions
            </Text>
          </View>
        ) : item.key === "s3" ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={mainImage3}
              style={[
                styles2.image,
                {
                  width: ScreenHeight * 0.4497,
                  height: ScreenHeight * 0.4497,
                  marginTop: ScreenHeight * 0.1079,
                },
              ]}
            ></Image>
            <Image
              source={multitext}
              style={[
                styles2.image,
                {
                  width: ScreenWidth * 0.5333333333 * 1.5,
                  marginTop: ScreenHeight * 0.0374812,
                },
              ]}
            ></Image>
            <Text style={[styles2.text, { marginTop: ScreenHeight * 0.02248 }]}>
              Users can manage multiple accounts
            </Text>
            <Text style={styles2.text}>on Quick Wallet</Text>
          </View>
        ) : item.key === "s4" ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={mainImage4}
              style={[
                styles2.image,
                {
                  width: ScreenHeight * 0.4497,
                  height: ScreenHeight * 0.4497,
                  marginTop: ScreenHeight * 0.1079,
                },
              ]}
            ></Image>
            <Image
              source={easytext}
              style={[
                styles2.image,
                {
                  width: ScreenWidth * 0.32 * 1.5,
                  marginTop: ScreenHeight * 0.0374812,
                },
              ]}
            ></Image>
            <Text style={[styles2.text, { marginTop: ScreenHeight * 0.02248 }]}>
              Simple operation, user-friendly
            </Text>
            <Text style={styles2.text}>interface</Text>
            <Button ScreenWidth={ScreenWidth} ScreenHeight={ScreenHeight} />
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <>
      <View
        style={[
          styles.container,
          { width: ScreenWidth, height: ScreenHeight, position: "relative" },
        ]}
      >
        <AppIntroSlider
          slides={slides}
          showDoneButton={false}
          showSkipButton={false}
          showPrevButton={true}
          onSkip={onSkip}
          doneLabel="DONE"
          nextLabel="NEXT"
          prevLabel="BACK"
          buttonTextStyle={{ color: "#642c83", fontSize: 13 }}
          // renderItem={item => renderItem(item)}
          activeDotStyle={{ backgroundColor: "#642c83" }}
          dotStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          renderItem={(item) => renderItem(item)}
        />
      </View>
    </>
  );
}

export const mystyles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginTop: 16,
  },
});

const slides = [
  {
    key: "s1",
  },
  {
    key: "s2",
  },
  {
    key: "s3",
  },
  {
    key: "s4",
  },
];
