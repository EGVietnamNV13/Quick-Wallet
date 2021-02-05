import React, { useState, useCallback, useEffect, Alert } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { walletStyles } from "../../styles/";
import { walletStylesLight } from "../../styles/light";
import {
  RectButton,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";
import depositwhite from "../../assets/images/depositwhite.png";
import withdrawwhite from "../../assets/images/withdrawwhite.png";
import { useNavigation } from "@react-navigation/native";
import { checkLanguage } from "../../helper";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetLoginData } from "../../store/actions";
import socket from "../../socket";

function add(arr, code, wallet) {
  const found = arr.some((el) => el.code === code);
  if (!found) arr.push({ code, wallet: wallet, coin_amount: 0 });
  return arr;
}

function checkElementExist(arr, code) {
  const found = arr.some((el) => el.code === code);
  return found;
}

export default function App({
  VisibleBalance,
  hiddenBalance,
  dataSocket,
  coinImg,
}) {
  const navigation = useNavigation();
  const [CoinHeight, setCoinHeight] = useState(0);
  const [SwipeList, setSwipeList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [LoadingDesWith, setLoadingDesWith] = useState(false);
  const typeCurrency = useSelector((state) => state.currency);
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);
  const dispatch = useDispatch();

  var WalletStyle = display === 1 ? walletStylesLight : walletStyles;

  var loginData = useSelector((state) => state.loginData);

  var coin_list = loginData.data.coin_list ?? [];

  var user_info = loginData.data.user_info;

  var coinNoExist = coinImg.filter(
    (o1) => !coin_list.some((o2) => o1.coin === o2.code)
  );

  // var coinNoExist = lodash.differenceWith(
  //   coinImg,
  //   coin_list,
  //   function (o1, o2) {
  //     return o1["coin"] === o2["code"];
  //   }
  // );

  console.log(loginData);
  const handleDepositWithdraw = useCallback(
    (id, balance, price, img, address, type) => {
      // console.log(id);
      setLoadingDesWith(true);

      var check = checkElementExist(coin_list, id);
      if (check) {
        setLoadingDesWith(false);
        // navigation.navigate("DepositPage2", {
        //   id: id,
        //   address: address,
        //   img: img,
        // });
        type === "deposit"
          ? navigation.navigate("DepositPage2", {
              id: id,
              address: address,
              balance: balance,
              img: img,
            })
          : navigation.navigate("WithdrawPage2", {
              id: id,
              balance: balance,
              price: price,
              img: img,
              address: address,
            });
        return;
      }
      for (let index = 0; index < coinNoExist.length; index++) {
        var element = coinNoExist[index];
        if (element.coin === id) {
          try {
            const form = {
              api_passer: {
                key_passer: "get_coi_adr",
                email: user_info.email,
                currency: id,
                token: loginData.token,
              },
            };
            socket.emit("/socketVnaWallet", form);
            socket.on("get_coi_adr", async function (res) {
              console.log(res);
              if ((res.status = true)) {
                console.log(res);
                add(loginData.data.coin_list, id, res.data);
                dispatch(asyncSetLoginData(loginData));
                setLoadingDesWith(false);
              } else {
                Alert.alert(
                  checkLanguage(
                    { vi: "Thông báo", en: "Notification" },
                    language
                  ),
                  checkLanguage(
                    {
                      vi: "Đã có lỗi xảy ra, vui lòng thử lại!",
                      en: "An error has occurred. Please try again!",
                    },
                    language
                  )
                );
              }
            });
          } catch (error) {
            setLoadingDesWith(false);
            Alert.alert(
              checkLanguage({ vi: "Thông báo", en: "Notification" }, language),
              checkLanguage(
                {
                  vi: "Đã có lỗi xảy ra, vui lòng thử lại",
                  en: "An error has occurred. Please try again",
                },
                language
              )
            );
          }
        }
      }
    }
  );

  const renderLeftActions = useCallback(
    (id, balance, price, img, address) => {
      return (
        <RectButton>
          <Animated.View>
            <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate("DepositPage2", {
              //     id: id,
              //     address: address,
              //     img: img,
              //   });
              // }}
              disabled={LoadingDesWith === true ? true : false}
              onPress={() =>
                handleDepositWithdraw(
                  id,
                  balance,
                  price,
                  img,
                  address,
                  "deposit"
                )
              }
              style={[
                WalletStyle.coinSwipeRight,
                {
                  height: CoinHeight,
                  opacity: LoadingDesWith === true ? 0.5 : 1,
                },
              ]}
            >
              {LoadingDesWith === true ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View>
                  <Image source={depositwhite} />
                  <Text style={{ color: "#fff", fontSize: 12 }}>
                    {checkLanguage({ vi: "Nạp", en: "Deposit" }, language)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        </RectButton>
      );
    },
    [CoinHeight, language]
  );

  const renderRightActions = useCallback(
    (id, balance, price, img, address) => {
      return (
        <RectButton>
          <Animated.View>
            <TouchableOpacity
              // onPress={() => {
              //   navigation.navigate("WithdrawPage2", {
              //     id: id,
              //     balance: balance,
              //     price: price,
              //     img: img,
              //     address: address,
              //   });
              // }}
              onPress={() =>
                handleDepositWithdraw(
                  id,
                  balance,
                  price,
                  img,
                  address,
                  "withdraw"
                )
              }
              style={[WalletStyle.coinSwipeLeft, { height: CoinHeight }]}
            >
              <Image source={withdrawwhite} />
              <Text style={{ color: "#fff", fontSize: 12 }}>
                {checkLanguage({ vi: "Rút", en: "Withdraw" }, language)}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </RectButton>
      );
    },
    [CoinHeight, language]
  );

  const handleSwipeClose = useCallback(
    (id) => {
      var index = SwipeList.findIndex((o) => o.id === id);
      if (index !== -1) SwipeList.splice(index, 1);
      setSwipeList([...SwipeList]);
    },
    [SwipeList]
  );

  const CheckIncludes = useCallback(
    (id) => {
      var index = SwipeList.findIndex((o) => o.id === id);
      if (index !== -1) return SwipeList[index].dir;
      else return false;
    },
    [SwipeList]
  );

  return (
    <>
      <View style={WalletStyle.listCoin}>
        <View style={WalletStyle.maskOpacity}></View>
        {coinImg.length > 0 ? null : (
          <ActivityIndicator
            style={{ paddingTop: 10 }}
            size="small"
            color="#642c83"
          />
        )}
        {coinImg.map((item, index) => {
          var price = "";
          var rate = "";
          for (let index = 0; index < dataSocket.length; index++) {
            const element = dataSocket[index];
            if (element.symbol === item.coin) {
              price = element.price;
              rate = element.rate;
            }
          }

          var address = "";
          var balance = "";
          for (let index = 0; index < coin_list.length; index++) {
            const element = coin_list[index];
            if (element.code === item.coin) {
              address = element.wallet;
              balance = element.coin_amount;
            }
          }
          return (
            <Swipeable
              onSwipeableClose={() => handleSwipeClose(1)}
              key={index}
              renderRightActions={() =>
                renderRightActions(item.coin, balance, price, item.img, address)
              }
              renderLeftActions={() =>
                renderLeftActions(item.coin, balance, price, item.img, address)
              }
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("History", {
                    id: item.coin,
                    address: address,
                    balance: balance,
                    coinPrice: price,
                  })
                }
                onLayout={(e) => setCoinHeight(e.nativeEvent.layout.height)}
                style={[WalletStyle.coin]}
              >
                <View
                  style={[
                    WalletStyle.maskOpacity2,
                    CheckIncludes(1) === "left"
                      ? {
                          backgroundColor: "#868d97",
                          opacity: 0.5,
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                        }
                      : CheckIncludes(1) === "right" && {
                          backgroundColor: "#868d97",
                          opacity: 0.5,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                  ]}
                ></View>
                <View style={WalletStyle.coinLeft}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{ uri: item.img }}
                  />
                  <View style={{ marginLeft: 8 }}>
                    <Text style={WalletStyle.coinName}>{item.coin}</Text>
                    <Text style={WalletStyle.coinPirce}>
                      {VisibleBalance ? hiddenBalance : price}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingLeft: 30,
                  }}
                >
                  <View style={{ marginLeft: 8 }}>
                    <Text
                      style={{
                        color: parseFloat(rate) >= 0 ? "green" : "red",
                        fontSize: 12,
                      }}
                    >
                      {VisibleBalance ? (
                        hiddenBalance
                      ) : dataSocket.length > 0 ? (
                        parseFloat(rate) > 0 ? (
                          "+" + parseFloat(rate).toFixed(4) + "%"
                        ) : (
                          parseFloat(rate).toFixed(4) + "%"
                        )
                      ) : (
                        <ActivityIndicator
                          style={{ paddingLeft: 30 }}
                          size="small"
                          color="#642c83"
                        />
                      )}
                    </Text>
                  </View>
                </View>

                <View style={WalletStyle.coinRight}>
                  <Text style={WalletStyle.quantity}>
                    {VisibleBalance ? hiddenBalance : balance}
                  </Text>
                  <Text style={WalletStyle.coinPirce}>
                    {VisibleBalance
                      ? hiddenBalance
                      : isNaN(
                          (parseFloat(balance) * parseFloat(price)).toFixed(2)
                        )
                      ? 0
                      : (parseFloat(balance) * parseFloat(price)).toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          );
        })}
      </View>
    </>
  );
}
