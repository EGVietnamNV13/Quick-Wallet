import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Clipboard,
  Share,
} from "react-native";

import { Header2 } from "../../Header";
import { mainStyles, accountStyle } from "../../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faCopy,
  faLink,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import FollowList from "../FollowList";
import { checkLanguage, storage } from "../../../helper";
import {
  asyncGetTransactionRef,
  asyncGetUserbyID,
} from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../Popup/Popup";
import { LinearGradient } from "expo-linear-gradient";
import store from "../../../store";

export default function App({ setOutScrollViewTop }) {
  const navigation = useNavigation();
  const [KDGReward, setKDGReward] = useState(0);
  const [RefCode, setRefCode] = useState("");
  const [RewardData, setRewardData] = useState([]);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);
  useEffect(() => {
    async function getUserInfo() {
      var userid = await storage("userId").getItem();

      dispatch(asyncGetTransactionRef(userid))
        .then((res) => {
          setRewardData(res.data);
        })
        .catch(console.log);

      dispatch(asyncGetUserbyID(userid))
        .then((res) => {
          setKDGReward(
            res.data ? (res.data.kdg_reward ? res.data.kdg_reward : 0) : 0
          );
          setRefCode(
            res.data ? (res.data.ref_code ? res.data.ref_code : "") : ""
          );
        })
        .catch(console.log);
    }
    getUserInfo();
  }, [RewardData]);
  console.log(RewardData);
  useEffect(() => {
    setOutScrollViewTop(
      <Header2
        title={checkLanguage({ vi: "Giới thiệu", en: "Referral" }, language)}
      />
    );
  }, []);

  const copyHandler1 = (val) => {
    Clipboard.setString(`https://www.kingdomgame.org/reg/${val}`);
    toggleModal();
  };

  const copyHandler2 = (val) => {
    Clipboard.setString(val);
    toggleModal();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setTimeout(function () {
      setModalVisible(false);
    }, 1000);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Ví KDG là một công cụ tuyệt vời giúp quản lý tài sản số một cách hiệu quả và có thật nhiều chức năng hữu ích cho người dùng. Hãy đăng ký theo link này và trải nghiệm nhé!
              \nhttps://www.kingdomgame.org/reg/${RefCode}
              `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <View style={[mainStyles.container]}>
        <Popup type="success" title="Đã copy" isModalVisible={isModalVisible} />
        <View
          style={{
            backgroundColor: display === 1 ? "#ffff" : "rgba(40, 51, 73, 0.4)",
            width: "100%",
            padding: 20,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: "#fff", fontSize: 16 }}>
              {checkLanguage({ vi: "Mã Liên Kết", en: "Share link" }, language)}
            </Text>
            <View style={{ position: "absolute", right: 0 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Rule");
                }}
              >
                <Text style={{ color: "#fac800", fontWeight: "bold" }}>
                  {checkLanguage({ vi: "Quy luật", en: "Rule" }, language)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingTop: 20 }}>
            <View style={{ flexDirection: "row", paddingBottom: 15 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: display === 1 ? "#283349" : "rgba(255,255,255,0.4)",
                }}
              >
                {checkLanguage(
                  { vi: "Link giới thiệu:", en: "Referral link:" },
                  language
                )}
              </Text>
              <TouchableOpacity
                onPress={() => copyHandler1(RefCode)}
                style={{ flexDirection: "row" }}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 15,
                    color: "#0687d7",
                    paddingLeft: 60,
                  }}
                >{`https://www.kingdomgame.\norg/reg/${RefCode}`}</Text>
                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", paddingBottom: 15 }}>
              <Text
                style={{
                  fontSize: 15,
                  color: display === 1 ? "#283349" : "rgba(255,255,255,0.4)",
                }}
              >
                {checkLanguage(
                  { vi: "Mã giới thiệu:", en: "Referral Code:" },
                  language
                )}
              </Text>
              <TouchableOpacity
                onPress={() => copyHandler2(RefCode)}
                style={{ flexDirection: "row" }}
              >
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 15,
                    color: display === 1 ? "#283349" : "#fff",
                    paddingLeft: 70,
                  }}
                >
                  {RefCode}
                </Text>
                <FontAwesomeIcon size={15} color="#fac800" icon={faCopy} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onShare}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: "25%",
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={[
                    "#d4af37",
                    "#edda8b",
                    "#a77b00",
                    "#e7be22",
                    "#e8bf23",
                  ]}
                  style={{
                    width: "90%",
                    padding: 12,
                    alignItems: "center",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon
                    size={15}
                    color="rgba(0,0,0,0.8)"
                    icon={faShareAlt}
                  />
                  <Text
                    style={{ color: "#fff", fontSize: 16, paddingLeft: 10 }}
                  >
                    {" "}
                    {checkLanguage(
                      { vi: "Chia sẻ", en: "Share" },
                      language
                    )}{" "}
                  </Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            backgroundColor: display === 1 ? "#ffff" : "rgba(40, 51, 73, 0.4)",
            width: "100%",
            padding: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyReward", {
                RewardData: RewardData,
              });
            }}
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: display === 1 ? "#283349" : "#fff" }}>
              {checkLanguage(
                { vi: "Phần Thưởng Của Tôi", en: "My Reward" },
                language
              )}{" "}
            </Text>
            <FontAwesomeIcon color="#fff" icon={faChevronRight} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 30,
            }}
          >
            <View
              style={{
                backgroundColor: "#121827",
                borderRadius: 10,
                width: "90%",
                padding: 5,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {" "}
                  {checkLanguage(
                    {
                      vi: "Số người KYC thành công",
                      en: "Number of successful KYC",
                    },
                    language
                  )}{" "}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#fac800",
                    paddingTop: 5,
                  }}
                >
                  {RewardData ? RewardData.length : 0}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
