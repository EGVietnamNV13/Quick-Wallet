import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { mainStyles, withdrawStyle, scannerStyles } from "../../../styles/";
import { withdrawStyleLight } from "../../../styles/light";
import { HeaderwithButton } from "../../Header";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { storage, checkLanguage } from "../../../helper";
import { asyncSetLoginData, asyncWithdraw } from "../../../store/actions";
import { Camera } from "expo-camera";
import ticker from "../../../assets/images/ticker.png";
import socket from "../../../socket";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Thay doi thong element trong array object

export default function App({ setOutScrollView }) {
  const typeCurrency = useSelector((state) => state.currency);
  // const coinNumbers = useSelector(state => state.coinNumbers)
  const language = useSelector((state) => state.language);
  const [Width, setWidth] = useState(0);

  const [Loading, setLoading] = useState(false);
  const display = useSelector((state) => state.display);

  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [SelectedType, setSelectedType] = useState(0);
  const [IsScannerOpen, setIsScannerOpen] = useState(false);
  const [LoginData, setLoginData] = useState("");
  // --------Value Submit----------
  const [ToAddress, setToAddress] = useState("");
  const [ValueSend, setValueSend] = useState("");
  const [Token, setToken] = useState("");
  // -------------------------------

  const [CoinPriceExchange, setCoinPriceExchange] = useState("0");

  // const {id} = route.params;
  const coinName = route.params.id;
  const coinImg = route.params.img;
  const price = route.params.price;
  const address = route.params.address;

  // useEffect(() => {
  //     async function getUserInfo() {
  //         var login_data = await storage('login_data').getItem();
  //         setLoginData(login_data)
  //     }
  //     getUserInfo()
  // }, [])

  // const

  var loginData = useSelector((state) => state.loginData);

  const userId = loginData.data.user_info.id;

  var balance = loginData.data.coin_list.find((x) => x.code === coinName)
    .coin_amount;
  function changeDesc(value, desc) {
    for (var i in loginData.data.coin_list) {
      if (loginData.data.coin_list[i].code == value) {
        loginData.data.coin_list[i].coin_amount = desc;
        break; //Stop this loop, we found it!
      }
    }
  }

  const withdraw = useCallback(async (valueSend, toAddress, price) => {
    var _id = parseInt(userId);
    var withdraw_amount = parseFloat(valueSend);
    var usdt = parseFloat(price);
    var numBalance = parseFloat(balance);

    try {
      const formdata = {
        api_passer: {
          key_passer: "wdr_coi_wal",
          user_id: _id,
          email: loginData.data.user_info.email,
          currency: coinName,
          withdraw_amount: withdraw_amount,
          usdt: usdt,
          deposit_address: toAddress,
          withdraw_address: address,
          token: loginData.token,
        },
      };
      socket.emit("/socketVnaWallet", formdata);
      socket.on("wdr_coi_wal", async function (res) {
        console.log(res);
        if (res.status === true) {
          setLoading(false);
          console.log("Log: Nạp false");
          Alert.alert(
            checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
            checkLanguage(
              {
                vi: "Đã rút tiền thành công",
                en: "Successfully",
              },
              language
            )
          );
          changeDesc(coinName, numBalance - withdraw_amount);

          dispatch(asyncSetLoginData(loginData));
        } else {
          setLoading(false);
          Alert.alert(
            checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
            checkLanguage(
              {
                vi: "Đã có lỗi xảy ra",
                en: "An error occurred",
              },
              language
            )
          );
          console.log("Log: Rút false");
        }
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  // const withdraw = useCallback(async (valueSend, toAddress, price) => {

  // }, []);

  const inputNumberHandler = (value) => {
    // console.log(balance);
    // console.log(price);
    setValueSend(value);
    setCoinPriceExchange(
      (Math.round(price * value * 10000) / 10000).toString()
    );
  };

  // const withdraw = useCallback(async (sel) => {
  //     setLoading(true)
  //     var userid = await storage('userId').getItem();
  //     var withdraw_type = coinName === 'TRX' ? 'tron' :
  //         coinName === 'USDT' && sel === 0 ? 'usdt' :
  //             coinName === 'USDT' && sel === 1 ? 'usdt-trc20' : coinName.toLowerCase();

  //     dispatch(asyncWithdraw({ userId: userid, value: ValueSend, deposit_type: withdraw_type, toAddress: ToAddress, token: Token }))
  //         .then((res) => {
  //             console.log(res)
  //             if (res.status === 1) {
  //                 setValueSend('')
  //                 setToAddress('')
  //                 setToken('')
  //                 setLoading(false)
  //                 Alert.alert(
  //                     checkLanguage({ vi: 'Thông báo', en: 'Notification' }, language),
  //                     `${checkLanguage({ vi: 'Rút thành công', en: 'Withdraw successfully' }, language)} ${ValueSend} ${coinName}`,
  //                 )

  //                 return
  //             } else if (res.status === 100) {
  //                 setLoading(false)
  //                 Alert.alert(
  //                     checkLanguage({ vi: 'Thông báo', en: 'Notification' }, language),
  //                     checkLanguage({ vi: 'Mã 2fa không chính xác', en: 'The 2fa code is failed' }, language),
  //                 )
  //             } else if (res.status === 101) {
  //                 setLoading(false)
  //                 Alert.alert(
  //                     checkLanguage({ vi: 'Thông báo', en: 'Notification' }, language),
  //                     checkLanguage({ vi: 'Bạn phải KYC trước khi rút', en: 'You must kyc before withdraw' }, language),
  //                 )
  //             } else {
  //                 setLoading(false)
  //                 Alert.alert(
  //                     checkLanguage({ vi: 'Thông báo', en: 'Notification' }, language),
  //                     checkLanguage({ vi: 'Giao dịch thất bại', en: 'Transaction failed' }, language),
  //                 )
  //             }

  //         })
  //         .catch(console.log)
  // }, [ToAddress, Token, ValueSend])

  const handleBarCodeScanned = useCallback(({ type, data }) => {
    // alert(`Scanned data = ${data}`);
    setToAddress(data);
    setIsScannerOpen(false);
  }, []);

  const openScanner = useCallback(async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setIsScannerOpen(true);
    } else {
      Alert.alert(
        "Cấp quyền",
        "Bạn phải cấp quyền camera để sử dụng tính năng này"
      );
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setIsScannerOpen(false);
      return true;
    });
  }, []);

  // -------------------style------------------------------

  var WithdrawStyle = display === 1 ? withdrawStyleLight : withdrawStyle;

  // ------------------------------------------------------

  return (
    <>
      {!IsScannerOpen && (
        <View style={mainStyles.container}>
          <HeaderwithButton
            toPress={() => openScanner()}
            title={
              checkLanguage({ vi: "Rút ", en: "Withdraw " }, language) +
              coinName
            }
          />
          <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
            <View style={WithdrawStyle.numberSendContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: coinImg }}
                    style={{
                      width: (windowWidth * windowHeight) / 9000,
                      height: (windowWidth * windowHeight) / 9000,
                    }}
                  />
                  <View
                    style={{
                      paddingLeft: (windowWidth * windowHeight) / 23040,
                    }}
                  >
                    <Text style={WithdrawStyle.coinName}>{coinName}</Text>
                    <Text style={WithdrawStyle.balance}>
                      {checkLanguage(
                        { vi: "Số dư: ", en: "Balance: " },
                        language
                      ) + balance}{" "}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Withdraw")}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text
                    style={{
                      color:
                        display === 1 ? "#283349" : "rgba(255,255,255,0.5)",
                      paddingRight: 5,
                    }}
                  >
                    {checkLanguage(
                      { vi: "Chọn coin", en: "Select coin" },
                      language
                    )}
                  </Text>
                  <FontAwesomeIcon
                    size={15}
                    color={display === 1 ? "#283349" : "rgba(255,255,255,0.5)"}
                    icon={faChevronRight}
                  />
                </TouchableOpacity>
              </View>

              {/* {
                                coinName === 'USDT' ?
                                    <View style={{ flexDirection: 'row', paddingHorizontal: 60, width: '100%', paddingTop: 30, justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'rgba(255,255,255,0.5)' }}>{checkLanguage({ vi: 'Chọn loại', en: 'Select type' }, language)}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => setSelectedType(0)} style={{ backgroundColor: SelectedType === 0 ? '#fac800' : '#ddd9d8', width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}>
                                                {SelectedType === 0 ? <Image source={ticker} /> : null}
                                            </TouchableOpacity>
                                            <Text style={{ color: display === 1 ? '#283349' : '#fff', paddingLeft: 10 }}>ERC-20</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => setSelectedType(1)} style={{ backgroundColor: SelectedType === 1 ? '#fac800' : '#ddd9d8', width: 20, height: 20, borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}>
                                                {SelectedType === 1 ? <Image source={ticker} /> : null}
                                            </TouchableOpacity>
                                            <Text style={{ color: display === 1 ? '#283349' : '#fff', paddingLeft: 10 }}>TRC-20</Text>
                                        </View>

                                    </View> : null

                            } */}
            </View>

            <View style={WithdrawStyle.numberSendContainer}>
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    color:
                      display === 1 ? "#283349" : "rgba(241, 243, 244, 0.7)",
                    fontSize: (windowWidth * windowHeight) / 23040,
                    marginBottom: windowHeight / 213,
                  }}
                >
                  {checkLanguage(
                    { vi: "Số tiền rút", en: "Withdrawal amount" },
                    language
                  )}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={WithdrawStyle.inputNumContainer}>
                    <View
                      style={{
                        flex: 3,
                        padding: (windowWidth * windowHeight) / 23040,
                      }}
                    >
                      <TextInput
                        keyboardType="number-pad"
                        placeholderTextColor="#8a8c8e"
                        onFocus={() => {}}
                        onBlur={() => {}}
                        onChangeText={(value) => inputNumberHandler(value)}
                        value={ValueSend}
                        style={WithdrawStyle.inputNum}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#642c83",
                        borderTopRightRadius: 10,
                        flex: 2,
                        borderBottomRightRadius: 10,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          alignItems: "center",
                          alignSelf: "center",
                          fontSize: 14,
                        }}
                      >
                        {coinName}
                      </Text>
                    </View>
                  </View>
                  <Text style={WithdrawStyle.nearSymbol}>≈</Text>
                  <View style={WithdrawStyle.inputNumContainer}>
                    <View
                      style={{
                        flex: 3,
                        padding: (windowWidth * windowHeight) / 23040,
                      }}
                    >
                      <TextInput
                        placeholderTextColor="#8a8c8e"
                        onFocus={() => {}}
                        onBlur={() => {}}
                        value={CoinPriceExchange}
                        style={WithdrawStyle.inputNum}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#642c83",
                        borderTopRightRadius: 10,
                        flex: 2,
                        borderBottomRightRadius: 10,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          alignItems: "center",
                          alignSelf: "center",
                          fontSize: 14,
                        }}
                      >
                        {typeCurrency === 1 ? "VND" : "USD"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={WithdrawStyle.numberSendContainer}>
              <View>
                <Text
                  style={{
                    color:
                      display === 1 ? "#283349" : "rgba(241, 243, 244, 0.7)",
                    fontSize: (windowWidth * windowHeight) / 23040,
                    marginBottom: windowHeight / 213,
                  }}
                >
                  {checkLanguage({ vi: "Rút về", en: "Withdraw to" }, language)}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={WithdrawStyle.inputNumContainer2}>
                    <View
                      style={{
                        flex: 3,
                        padding: (windowWidth * windowHeight) / 23040,
                      }}
                    >
                      <TextInput
                        placeholder={checkLanguage(
                          {
                            vi: "Nhập địa chỉ nhận tiền",
                            en: "Enter receiving address",
                          },
                          language
                        )}
                        placeholderTextColor="#8a8c8e"
                        onFocus={() => {}}
                        onBlur={() => {}}
                        onChangeText={(value) => setToAddress(value)}
                        value={ToAddress}
                        style={WithdrawStyle.inputNum}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* <View style={WithdrawStyle.numberSendContainer}>
                            <View>
                                <Text style={{ color: display === 1 ? '#283349' : 'rgba(241, 243, 244, 0.7)', fontSize: (windowWidth * windowHeight) / 23040, marginBottom: windowHeight / 213 }}>{checkLanguage({ vi: 'Mã xác thực 2FA', en: '2FA code' }, language)}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={WithdrawStyle.inputNumContainer2}>
                                        <View style={{ padding: (windowWidth * windowHeight) / 23040 }}>
                                            <TextInput
                                                keyboardType='decimal-pad'
                                                placeholder={checkLanguage({ vi: 'Xác thực 2FA', en: '2FA Authentication' }, language)}
                                                placeholderTextColor="#8a8c8e"
                                                onFocus={() => { }}
                                                onBlur={() => { }}
                                                onChangeText={value => setToken(value)}
                                                value={Token}
                                                style={WithdrawStyle.inputNum} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View> */}

            <TouchableOpacity
              disabled={Loading ? true : false}
              onPress={() => withdraw(ValueSend, ToAddress, price)}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: windowHeight / 25,
                }}
              >
                <LinearGradient
                  colors={["#642c83", "#642c83"]}
                  style={{
                    backgroundColor: "#2e394f",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                    width: "92%",
                    height: windowHeight / 14,
                    opacity: Loading ? 0.4 : 1,
                  }}
                >
                  {Loading === true ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={{ color: "#fff", fontSize: 16 }}>
                      {checkLanguage({ vi: "Rút", en: "Withdraw" }, language)}
                    </Text>
                  )}
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {IsScannerOpen && (
        <View
          style={[
            scannerStyles.container,
            {
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setIsScannerOpen(false)}
            style={{
              paddingTop: 150,
              alignItems: "flex-end",
              paddingRight: 20,
            }}
          >
            <FontAwesomeIcon
              style={{ color: "#fac800" }}
              size={30}
              icon={faTimes}
            />
          </TouchableOpacity>
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            ratio="1:1"
            style={[
              {
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").width,
                position: "absolute",
                top: "50%",
                transform: [
                  { translateY: -Dimensions.get("screen").width / 2 },
                ],
              },
            ]}
          />
        </View>
      )}
    </>
  );
}
