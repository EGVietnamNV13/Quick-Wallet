import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { mainStyles } from "../../styles";
import { Header2 } from "../Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import coin from "../../assets/images/IconCoin/AMM.png";
import coinUsdt from "../../assets/images/IconCoin/USDT.png";
import switchswap from "../../assets/images/switchswap.png";
import {
  actChangeSecureStatus,
  asyncConvertQuick,
  asyncConvertQuickReward,
  asyncGetUserbyID,
} from "../../store/actions";
import { storage, checkLanguage } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { PopupSelector } from "../Popup";
import socket from "../../socket";
import { set } from "react-native-reanimated";
//        <View style={AccountStyle.itemHeader}>
//     <Image source={support}/>
//     <Text style={AccountStyle.textHeader}>{checkLanguage({vi: 'Hỗ trợ', en: 'Support'},language)}</Text>
// </View>

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App({ setOutScrollViewTop, setOutScrollView }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);
  const secstatus = useSelector((state) => state.secstatus);

  const [SwapType, setSwapType] = useState(1);
  const [ValueSwap, setValueSwap] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [QuickReward, setQuickReward] = useState("Loading...");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    setOutScrollViewTop(<Header2 title="Swap" />);
  }, [ValueSwap]);

  useEffect(() => {
    async function getQuick_Reward() {
      var userid = await storage("userId").getItem();
      dispatch(asyncGetUserbyID(userid))
        .then((res) => {
          if (res.data.Quick_reward) {
            setQuickReward(res.data.Quick_reward.toString());
          } else {
            setQuickReward("0");
          }
        })
        .catch(console.log);
    }

    getQuick_Reward();
  }, [QuickReward, isFocused]);

  const Swap = useCallback(async () => {
    setLoading(true);

    var userid = await storage("userId").getItem();

    if (SwapType === 1) {
      dispatch(
        asyncConvertQuickReward({ userId: userid, value: ValueSwap / 2 })
      )
        .then((res) => {
          if (res.status === 104) {
            setLoading(false);
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                {
                  vi: "Bạn phải chuyển đổi tối thiểu 25 Quick Reward",
                  en: "The mimimum amount to swap is 25 Quick reward",
                },
                language
              )
            );
            return;
          }
          if (res.status === 100) {
            setLoading(false);
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                {
                  vi: "Bạn không đủ Quick Reward",
                  en: `You don't have enough Quick reward`,
                },
                language
              )
            );
            return;
          }
          if (res.status === 101) {
            setLoading(false);
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                {
                  vi: "Bạn chỉ có thể Swap tối đa 20 Quick Reward 1 ngày",
                  en: `You can swap maximum 20 Quick reward per day`,
                },
                language
              )
            );
            return;
          }
          if (res.status === 105) {
            setLoading(false);
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                {
                  vi:
                    "Quick Reward hiện tại không khả dụng, vui lòng thử lại sau",
                  en: `Quick Reward not available, please try again later`,
                },
                language
              )
            );
            return;
          }
          if (res.status === 1) {
            setLoading(false);
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                { vi: "Swap thành công", en: `Swap successfully` },
                language
              )
            );
            setQuickReward(QuickReward - ValueSwap);
            dispatch(
              actChangeSecureStatus({
                ...secstatus,
                Quick_reward: QuickReward,
              })
            );
            setValueSwap(0);
            return;
          }
          setLoading(false);
          Alert.alert(
            checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
            checkLanguage({ vi: "Swap thất bại", en: `Swap failed` }, language)
          );
        })
        .catch(console.log);
    }

    if (SwapType === 2) {
      dispatch(asyncConvertQuick({ userId: userid, value: ValueSwap })).then(
        (res) => {
          setLoading(false);
          if (res.status === 1) {
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                {
                  vi: "Chuyển đổi Quick Reward thành công",
                  en: "Swap Quick Reward successfully",
                },
                language
              )
            );
          } else if (res.status === 100) {
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                {
                  vi: "Chuyển đổi nhỏ nhất 2 Quick, lớn nhất 200 Quick",
                  en: "Min swap : 2 Quick, max swap : 200 Quick",
                },
                language
              )
            );
          } else if (res.status === 101) {
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                {
                  vi: "Giới hạn chuyển đổi 5 lần 1 ngày",
                  en: "Limit swap 5 time per day",
                },
                language
              )
            );
          } else {
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                { vi: "Chuyển đổi thất bại", en: "Swap Quick fail" },
                language
              )
            );
          }
        }
      );
    }
  }, [ValueSwap, SwapType]);

  var loginData = useSelector((state) => state.loginData);

  var coin_list = loginData?.data?.coin_list;

  const [coinImg, setCoinImg] = useState([]);
  const [coinSelected, setCoinSelected] = useState("BTC");
  useEffect(() => {
    try {
      const formdata = {
        api_passer: {
          key_passer: "get_coi_lst",
        },
      };
      socket.emit("/socketVnaWallet", formdata);
      socket.on("get_coi_lst", async function (res) {
        setCoinImg(res);
      });
    } catch (error) {}
  }, []);

  useEffect(() => {
    setIsModalVisible(false);
  }, [coinSelected]);

  return (
    <>
      <View style={mainStyles.container}>
        <PopupSelector
          type="success"
          isModalVisible={isModalVisible}
          onBackdropPress={() => setIsModalVisible(false)}
          onBackButtonPress={() => setIsModalVisible(false)}
        >
          {coinImg.map((item) => (
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "rgba(0,0,0,0.2)",
                width: "100%",
                backgroundColor:
                  coinSelected === item.coin ? "#642c83" : "#fff",
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setCoinSelected(item.coin)}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{ uri: item.img }}
                />
                <Text
                  style={{
                    color: coinSelected === item.coin ? "#fff" : "#000",
                    paddingVertical: 20,
                    paddingLeft: 10,
                  }}
                >
                  {item.coin}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </PopupSelector>
        <View>
          <View style={{ padding: 15 }}>
            <View
              style={{
                backgroundColor: display === 1 ? "#ffff" : "rgba(40,51,73,0.4)",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 3, position: "relative" }}>
                  <View
                    style={{
                      padding: 25,
                      borderColor:
                        display === 1 ? "#eeeceb" : "rgba(255,255,255,0.3)",
                      borderBottomWidth: 0.8,
                      borderRightWidth: 0.8,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 120,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Image style={{ width: 35, height: 35 }} source={coin} />
                      <Text
                        style={{
                          color: display === 1 ? "#283349" : "#fff",
                          fontSize: 15,
                          paddingTop: 5,
                        }}
                      >
                        QUICK
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      bottom: -(35 / 2),
                      right: -(35 / 2),
                    }}
                  >
                    <TouchableOpacity
                      // onPress={() => {
                      //   if (SwapType === 1) {
                      //     setSwapType(2);
                      //   } else {
                      //     setSwapType(1);
                      //   }
                      // }}
                      disabled={true}
                      style={{
                        backgroundColor: display === 1 ? "#ddd9d8" : "#fff",
                        borderRadius: 45,
                        width: 35,
                        height: 35,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                      }}
                    >
                      <Image
                        style={{ resizeMode: "contain", width: 25 }}
                        source={switchswap}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 5 }}>
                  <View
                    style={{
                      padding: 25,
                      borderColor:
                        display === 1 ? "#eeeceb" : "rgba(255,255,255,0.3)",
                      borderBottomWidth: 0.8,
                      justifyContent: "center",
                      height: 120,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color:
                            display === 1 ? "#283349" : "rgba(255,255,255,0.3)",
                          fontWeight: "bold",
                        }}
                      >
                        {checkLanguage({ vi: "Trả", en: "Pay" }, language)}
                      </Text>
                      <TextInput
                        keyboardType="numeric"
                        value={ValueSwap.toString()}
                        onChangeText={(value) => setValueSwap(value)}
                        style={{
                          color: "#642c83",
                          fontSize: 25,
                          paddingVertical: 3.5,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 3 }}>
                  <View
                    style={{
                      padding: 25,
                      borderColor:
                        display === 1 ? "#eeeceb" : "rgba(255,255,255,0.3)",
                      borderBottomWidth: 0.8,
                      borderRightWidth: 0.8,
                      justifyContent: "center",
                      alignItems: "center",
                      height: 120,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <Image
                          style={{ width: 35, height: 35 }}
                          source={{
                            uri: coinImg.find((e) => e?.coin === coinSelected)
                              ?.img,
                          }}
                        />
                        <Text
                          style={{
                            color: display === 1 ? "#283349" : "#fff",
                            fontSize: 15,
                            paddingTop: 5,
                          }}
                        >
                          {coinSelected}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 5 }}>
                  <View
                    style={{
                      padding: 25,
                      borderColor:
                        display === 1 ? "#eeeceb" : "rgba(255,255,255,0.3)",
                      borderBottomWidth: 0.8,
                      justifyContent: "center",
                      height: 120,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color:
                            display === 1 ? "#283349" : "rgba(255,255,255,0.3)",
                          fontWeight: "bold",
                        }}
                      >
                        {checkLanguage({ vi: "Nhận", en: "Receive" }, language)}
                      </Text>
                      <TextInput
                        value={ValueSwap}
                        editable={false}
                        style={{
                          color: "#642c83",
                          fontSize: 25,
                          paddingVertical: 3.5,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ padding: 10, flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.3)",
                    fontWeight: "400",
                  }}
                >
                  {checkLanguage(
                    { vi: "Khả dụng: ", en: "Available: " },
                    language
                  )}
                </Text>
                <Text
                  style={{ fontSize: 15, color: "#fff", fontWeight: "400" }}
                >
                  {" " + QuickReward}
                </Text>
              </View>
            </View>

            {/* <View style={{ paddingTop: 10 }}>
              <View>
                <Text
                  style={{
                    color: display === 1 ? "#8a8c8e" : "#fff",
                    textDecorationLine: "underline",
                    fontStyle: "italic",
                  }}
                >
                  {checkLanguage({ vi: "Lưu ý:", en: `Note:` }, language)}
                </Text>
              </View>
              {SwapType === 1 ? (
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.7)",
                      fontSize: 14,
                    }}
                  >
                    {checkLanguage(
                      {
                        vi:
                          "Tài khoản đăng ký trước ngày 1/9 sẽ được đổi tối đa ",
                        en:
                          "Account registration before 1/9/2020 are able to swap the reward maximum ",
                      },
                      language
                    )}
                    <Text
                      style={{
                        color: "#642c83",
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      {checkLanguage(
                        { vi: "20 Quick Reward/ ngày", en: "20Quick / day" },
                        language
                      )}
                    </Text>
                    ,{" "}
                    {checkLanguage(
                      { vi: "duy nhất 1 lần / ngày", en: "only 1 time / day" },
                      language
                    )}
                  </Text>
                  <Text
                    style={{
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      paddingTop: 10,
                    }}
                  >
                    2 Quick Reward = 1 Quick
                  </Text>
                  <Text
                    style={{
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      paddingTop: 20,
                    }}
                  >
                    {checkLanguage(
                      {
                        vi:
                          "Tài khoản đăng ký sau ngày 1/9 sẽ được quy đổi thành Quick token khi bạn ",
                        en:
                          "Account registration after 1/9/2020 are able to swap the reward when ",
                      },
                      language
                    )}
                    <Text
                      style={{
                        color: "#642c83",
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      {checkLanguage(
                        {
                          vi: "có đủ 25 Quick reward, tối đa 50 Quick reward ",
                          en:
                            "being enough 25Quick / day, maximum 50Quick / day",
                        },
                        language
                      )}
                    </Text>
                    ,{" "}
                    {checkLanguage(
                      { vi: "duy nhất 1 lần / ngày", en: "only 1 time / day" },
                      language
                    )}
                  </Text>
                  <Text
                    style={{
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      paddingTop: 10,
                    }}
                  >
                    2 Quick Reward = 1 Quick
                  </Text>
                </View>
              ) : (
                <View style={{ padding: 10 }}>
                  <Text
                    style={{
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.7)",
                      fontSize: 14,
                    }}
                  >
                    {checkLanguage(
                      {
                        vi: "Tỷ lệ: 1 Quick = 2 Quick reward ",
                        en: "Ratio: 1 Quick = 2 Quick rewards ",
                      },
                      language
                    )}
                  </Text>
                  <Text
                    style={{
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      paddingTop: 20,
                    }}
                  >
                    {checkLanguage(
                      {
                        vi:
                          "Mỗi lần được swap tối đa 200 Quick. Tối thiểu 2 Quick.",
                        en:
                          "Maximum 200 Quick and Minimum 2 Quick for each swap.",
                      },
                      language
                    )}
                  </Text>
                  <Text
                    style={{
                      color:
                        display === 1 ? "#8a8c8e" : "rgba(255,255,255,0.7)",
                      fontSize: 14,
                      paddingTop: 20,
                    }}
                  >
                    {checkLanguage(
                      {
                        vi: "Mỗi ngày swap tối đa 5 lần/tài khoản.",
                        en: "Swap up to 5 times per day per account.",
                      },
                      language
                    )}
                  </Text>
                </View>
              )}
            </View> */}
          </View>
          <TouchableOpacity onPress={Swap}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: windowHeight / 15,
              }}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#642c83", "#642c83"]}
                style={{
                  width: "90%",
                  padding: 12,
                  alignItems: "center",
                  borderRadius: 20,
                }}
              >
                {Loading === true ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={{ color: "#fff", fontSize: 16 }}>
                    {checkLanguage({ vi: "Xác nhận", en: `Confirm` }, language)}
                  </Text>
                )}
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
