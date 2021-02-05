import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import image from "../../assets/images/account-header-background.jpg";
import { accountStyle, mainStyles } from "../../styles";
import { accountStyleLight } from "../../styles/light";
import wallet from "../../assets/images/wallet-account.png";
import support from "../../assets/images/support-account.png";
import invitation from "../../assets/images/invitation-account.png";
import defaultAvata from "../../assets/images/default-avata.webp";
import defaultAvataPNG from "../../assets/images/default-avata.png";
import List from "./ListSetting";
import { storage, checkLanguage } from "../../helper";

import { useSelector } from "react-redux";

export default function App({ navigation }) {
  const [UserName, setUserName] = useState("");
  const [UserEmail, setUserEmail] = useState("");

  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);

  const loginData = useSelector((state) => state.loginData);

  // useEffect(() => {
  //   async function getUserInfo() {
  //     var userinfo = await storage("userData").getItem();
  //     setUserName(userinfo.first_name + " " + userinfo.last_name);
  //     setUserEmail(userinfo.email);
  //akdkalsdal}

  //   getUserInfo();
  // }, [UserName, UserEmail]);

  // -------------------style------------------------------

  var AccountStyle = display === 1 ? accountStyleLight : accountStyle;

  // ------------------------------------------------------
  return (
    <>
      <View style={[mainStyles.container]}>
        <Text style={AccountStyle.title}>
          {checkLanguage({ vi: "Tài khoản", en: "Profile" }, language)}
        </Text>
        {/* <ImageBackground style={{width: '100%'}} source={image}>
                <View style={AccountStyle.backgroundHead}>
                    <Text style={AccountStyle.title}>{checkLanguage({vi: 'Tài khoản', en: 'Profile'},language)}</Text>
                    <View style={AccountStyle.rowHeader}>
                        <View style={AccountStyle.itemHeader}>
                            <TouchableOpacity 
                                style={{alignItems: 'center'}}
                                onPress={() => {navigation.navigate('WalletManage')}}
                            >
                                <Image source={wallet}/>
                                <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Quản lý ví', en: 'Manage Wallet'},language)}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={AccountStyle.itemHeader}>
                            <Image source={support}/>
                            <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Hỗ trợ', en: 'Support'},language)}</Text>
                        </View>
           
                               <View style={AccountStyle.itemHeader}>
                            <Image source={support}/>
                            <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Hỗ trợ', en: 'Support'},language)}</Text>
                        </View>
                        //        <View style={AccountStyle.itemHeader}>
                        //     <Image source={support}/>
                        //     <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Hỗ trợ', en: 'Support'},language)}</Text>
                        // </View>
                        <View style={AccountStyle.itemHeader}>
                            <TouchableOpacity 
                                style={{alignItems: 'center'}}
                                onPress={() => {navigation.navigate('Reward')}}
                            >
                                <Image source={invitation}/>
                                <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Phần thưởng', en: 'Reward'},language)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground> */}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              // userName: UserName,
              email: UserEmail,
            })
          }
          style={AccountStyle.profileBar}
        >
          <View style={AccountStyle.blockAvata}>
            <Image
              style={AccountStyle.avata}
              source={Platform.OS === "ios" ? defaultAvataPNG : defaultAvata}
            />
          </View>
          <Text style={AccountStyle.profileBarEmail}>
            {loginData.data.user_info.email}
          </Text>
          <LinearGradient
            start={[0, 1]}
            end={[1, 0]}
            style={AccountStyle.pen}
            colors={["#642c83", "#642c83"]}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Profile", {
                  // userName: UserName,
                  email: loginData.data.user_info.email,
                })
              }
              style={AccountStyle.touchPen}
            >
              <FontAwesomeIcon color="#fff" icon={faPen} />
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>

        <List />
      </View>
    </>
  );
}
