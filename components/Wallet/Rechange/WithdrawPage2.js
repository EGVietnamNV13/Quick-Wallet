import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { mainStyles, withdrawStyle } from "../../../styles";
import { Header2 } from "../../Header";
import logo from "../../../assets/images/logo.png";
import coin from "../../../assets/images/coin.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
export default function App() {
  const [Width, setWidth] = useState(0);
  const [list, setList] = useState([
    { text: "KDG", icon: coin, description: "Kingdom Game 4.0", key: "1" },
    { text: "BTC", icon: coin, description: "Bitcoin", key: "2" },
    { text: "ETH", icon: coin, description: "Ethereum", key: "3" },
    { text: "KNC", icon: coin, description: "Kyber Network", key: "4" },
  ]);
  const [sendTo, setSendTo] = useState();
  const [address, setAddress] = useState();
  const [searchVal, setSearchVal] = useState();
  const navigation = useNavigation();
  const route = useRoute();

  const { coinID, coinName } = route.params;
  return (
    <>
      <View style={mainStyles.container}>
        <Header2 title={"Gửi " + coinName} />
        <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          <View>
            <View style={withdrawStyle.balanceContainer}>
              <View style={withdrawStyle.listContainer}>
                <Image
                  source={coin}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
                <View>
                  <Text style={withdrawStyle.coinName}>{coinName}</Text>
                  <Text style={withdrawStyle.balance}>Số dư: {"0"} BTC</Text>
                </View>
              </View>
            </View>

            <View style={withdrawStyle.numberSendContainer}>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: "rgba(241, 243, 244, 0.7)",
                    fontSize: 15,
                    paddingLeft: 20,
                  }}
                >
                  Số tiền gửi
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "93%",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={withdrawStyle.inputNumContainer}>
                    <View style={{ flex: 3, padding: 10 }}>
                      <TextInput
                        keyboardType="number-pad"
                        placeholderTextColor="#8a8c8e"
                        onFocus={() => {}}
                        onBlur={() => {}}
                        onChangeText={(value) => setSendTo(value)}
                        value={sendTo}
                        style={withdrawStyle.inputNum}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#fac800",
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
                        }}
                      >
                        {coinName}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{ color: "rgba(241, 243, 244, 0.5)", fontSize: 40 }}
                  >
                    ≈
                  </Text>
                  <View style={withdrawStyle.inputNumContainer}>
                    <View style={{ flex: 3, padding: 10 }}>
                      <TextInput
                        placeholderTextColor="#8a8c8e"
                        onFocus={() => {}}
                        onBlur={() => {}}
                        // onChangeText={value=>setAddress(value)}
                        value={150}
                        style={withdrawStyle.inputNum}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#fac800",
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
                        }}
                      >
                        USD
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={withdrawStyle.numberSendContainer}>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: "rgba(241, 243, 244, 0.7)",
                    fontSize: 15,
                    paddingLeft: 20,
                  }}
                >
                  Gửi đến
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "93%",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={withdrawStyle.inputNumContainer2}>
                    <View style={{ flex: 3, padding: 10 }}>
                      <TextInput
                        placeholder="Nhập địa chỉ cần nhận tiền"
                        placeholderTextColor="#8a8c8e"
                        onFocus={() => {}}
                        onBlur={() => {}}
                        onChangeText={(value) => setSearchVal(value)}
                        value={searchVal}
                        style={withdrawStyle.inputNum}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={withdrawStyle.numberSendContainer}>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    color: "rgba(241, 243, 244, 0.7)",
                    fontSize: 15,
                    paddingLeft: 20,
                  }}
                >
                  Ghi chú
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "93%",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={withdrawStyle.inputNumContainer2}>
                    <View style={{ flex: 3, padding: 10 }}>
                      <TextInput
                        placeholder="Nhập địa chỉ cần nhận tiền"
                        placeholderTextColor="#8a8c8e"
                        onFocus={() => {}}
                        onBlur={() => {}}
                        onChangeText={(value) => setSearchVal(value)}
                        value={searchVal}
                        style={withdrawStyle.inputNum}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={withdrawStyle.numberSendContainer2}>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  width: "94%",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: "rgba(241, 243, 244, 0.7)",
                    fontSize: 15,
                    paddingLeft: 20,
                  }}
                >
                  Phí giao dịch
                </Text>
                <Text style={{ color: "#fac800" }}>0.000032 {coinName}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <LinearGradient
                  colors={["#e5be50", "#ecda8b", "#a47b00"]}
                  style={{
                    width: "95%",
                    height: 68,
                    position: "relative",
                    backgroundColor: "#2e394f",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 30,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 16 }}>Gửi</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
