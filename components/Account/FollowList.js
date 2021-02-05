import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Button,
} from "react-native";

import { accountStyle } from "../../styles";
import { accountStyleLight } from "../../styles/light";

import twitter from "../../assets/images/twitter.png";
import instagram from "../../assets/images/instagram.png";
import facebook from "../../assets/images/facebook.png";
import medium from "../../assets/images/medium.png";
import youtube from "../../assets/images/youtube.png";
import zalo from "../../assets/images/zalo.png";
import telegram from "../../assets/images/FolllowList/telegram.png";
import { useSelector } from "react-redux";

// import zalo from '../../assets/images/FolllowList/zalo.png'

// import messenger from '../../assets/images/FolllowList/messenger.png'
// import email from '../../assets/images/FolllowList/email.png'
// import gmail from '../../assets/images/FolllowList/zalo.png'

const ListFollows = [twitter, facebook, medium, youtube, telegram];

const ListFollow = [
  { link: "https://twitter.com/egroupsvietnam/", icon: twitter },
  { link: "https://www.facebook.com/egroupsvn/", icon: facebook },
  // { link: 'https://egvietnam.vn/', icon: medium },
  // { link: 'https://egvietnam.vn/', icon: youtube },
  { link: "https://t.me/vannhienit", icon: telegram },
];

const supportedURL = "https://google.com";

const OpenURLButton = ({ url, icon, key }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      //        <View style={AccountStyle.itemHeader}>
      //     <Image source={support}/>
      //     <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Hỗ trợ', en: 'Support'},language)}</Text>
      // </View>
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      key={key}
      style={accountStyle.followBlock}
    >
      <Image style={accountStyle.followIcon} source={icon} />
    </TouchableOpacity>
  );
};

export default function App() {
  const display = useSelector((state) => state.display);

  // -------------------style------------------------------

  var AccountStyle = display === 1 ? accountStyleLight : accountStyle;

  // ------------------------------------------------------

  return (
    <>
      <View style={AccountStyle.listFollow}>
        <View style={AccountStyle.maskOpacity} />
        {ListFollow.map((el, index) => (
          <OpenURLButton url={el.link} icon={el.icon} key={index} />
        ))}
      </View>
    </>
  );
}
