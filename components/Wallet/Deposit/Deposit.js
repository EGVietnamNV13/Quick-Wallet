import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, FlatList } from "react-native";
import { mainStyles, withdrawStyle } from "../../../styles";
import { withdrawStyleLight } from "../../../styles/light";
import { Header2 } from "../../Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { checkLanguage } from "../../../helper";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../../socket";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App({ setOutScrollViewTop }) {
  const [Width, setWidth] = useState(0);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);

  const route = useRoute();

  const socketState = useSelector((state) => state.coin);

  const [dataSocket, setDataSocket] = useState(socketState.dataSocket);
  useEffect(() => {
    socket.on("SOCKET_COIN_CHANGE", (res) => {
      setDataSocket(res);
    });
  }, []);

  const [searchVal, setSearchVal] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    setOutScrollViewTop(
      <Header2
        title={checkLanguage({ vi: "Chọn coin", en: "Select coin" }, language)}
      />
    );
  }, []);
  // -------------------style------------------------------
  var WithdrawStyle = display === 1 ? withdrawStyleLight : withdrawStyle;

  // ------------------------------------------------------

  var loginData = useSelector((state) => state.loginData);

  var coin_list = loginData.data.coin_list;

  return (
    <>
      <View style={mainStyles.container}>
        <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          <View style={{ padding: (windowWidth * windowHeight) / 29376 }}>
            <View style={WithdrawStyle.searchBoxContainer}>
              <View style={{ justifyContent: "center", paddingRight: 10 }}>
                <FontAwesomeIcon color="#8a8c8e" icon={faSearch} />
              </View>
              <TextInput
                placeholder={checkLanguage(
                  { vi: "Tìm kiếm", en: "Search" },
                  language
                )}
                placeholderTextColor="#8a8c8e"
                onFocus={() => {}}
                onBlur={() => {}}
                onChangeText={(value) => setSearchVal(value)}
                value={searchVal}
                style={WithdrawStyle.searchBox}
              />
            </View>

            {searchVal ? (
              <View>
                <Text
                  style={{
                    color: display === 1 ? "#8a8c8e" : "rgba(241,243,244, 0.5)",
                    fontSize: 12,
                    padding: 10,
                  }}
                >
                  {checkLanguage({ vi: "Kết quả", en: `Result` }, language)}
                </Text>
                <FlatList
                  data={socketState.coinImg}
                  renderItem={({ item }) => {
                    var price = "";
                    for (let index = 0; index < dataSocket.length; index++) {
                      const element = dataSocket[index];
                      if (element.symbol === item.coin) {
                        price = element.price;
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
                    if (
                      item.coin
                        .toLowerCase()
                        .startsWith(searchVal.toLowerCase()) ||
                      item.name
                        .toLowerCase()
                        .startsWith(searchVal.toLowerCase())
                    ) {
                      return (
                        <View style={WithdrawStyle.listContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("WithdrawPage2", {
                                id: item.coin,
                                balance: balance,
                                price: price,
                                img: item.img,
                                address: address,
                              })
                            }
                          >
                            <View style={{ flexDirection: "row" }}>
                              <Image
                                source={{ uri: item.img }}
                                style={{ width: 35, height: 35 }}
                              />
                              <View
                                style={{
                                  width: "93%",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  paddingLeft:
                                    (windowWidth * windowHeight) / 35251,
                                }}
                              >
                                <View>
                                  <Text style={WithdrawStyle.textList}>
                                    {item.coin}
                                  </Text>
                                  <Text style={WithdrawStyle.description}>
                                    {item.name}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    paddingRight:
                                      (windowWidth * windowHeight) / 29376,
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <Text style={WithdrawStyle.exchangeRate}>
                                    {price}
                                  </Text>
                                  <Text style={WithdrawStyle.nearExchangeRate}>
                                    ≈ ${price}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  }}
                />
              </View>
            ) : (
              <FlatList
                data={socketState.coinImg}
                renderItem={({ item }) => {
                  var price = "";
                  for (let index = 0; index < dataSocket.length; index++) {
                    const element = dataSocket[index];
                    if (element.symbol === item.coin) {
                      price = element.price;
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
                    <View style={WithdrawStyle.listContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("DepositPage2", {
                            id: item.coin,
                            balance: balance,
                            price: price,
                            img: item.img,
                            address: address,
                          })
                        }
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={{ uri: item.img }}
                            style={{ width: 35, height: 35 }}
                          />
                          <View
                            style={{
                              width: "93%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              paddingLeft: (windowWidth * windowHeight) / 35251,
                            }}
                          >
                            <View>
                              <Text style={WithdrawStyle.textList}>
                                {item.coin}
                              </Text>
                              <Text style={WithdrawStyle.description}>
                                {item.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                paddingRight:
                                  (windowWidth * windowHeight) / 29376,
                                alignItems: "flex-end",
                              }}
                            >
                              <Text style={WithdrawStyle.exchangeRate}>
                                {price}
                              </Text>
                              <Text style={WithdrawStyle.nearExchangeRate}>
                                ≈ ${price}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
}
