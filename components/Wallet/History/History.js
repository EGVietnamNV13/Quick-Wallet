import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Clipboard,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import { mainStyles } from "../../../styles";
import { Header2 } from "../../Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faChevronLeft,
  faChevronRight,
  faCopy,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import Select from "./Select";
import HistoryButton from "../../Button/HistoryButton";
import Popup from "../../Popup/Popup";

import emptyicon from "../../../assets/images/emptyicon.png";
import { storage, checkLanguage } from "../../../helper";
import { asyncGetTransaction } from "../../../store/actions";
import WebView from "react-native-webview";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const paginate = function (array, index, size) {
  // transform values
  index = Math.abs(parseInt(index));
  size = parseInt(size);
  size = size < 1 ? 1 : size;

  // filter
  return [
    ...array.filter((value, n) => {
      return n >= index * size && n < (index + 1) * size;
    }),
  ];
};

export default function App({ setOutScrollView, setOutScrollViewTop }) {
  useEffect(() => {
    setOutScrollViewTop(<Header2 title={coinName} />);
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setTimeout(function () {
      setModalVisible(false);
    }, 1000);
  };

  const coinNumbers = useSelector((state) => state.coinNumbers);

  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [Loading, setLoading] = useState(false);

  const [Skip, setSkip] = useState(0);

  const [SelectType, setSelectType] = useState(null);
  const [SelectedHistory, setSelectedHistory] = useState("Tất cả");
  const [SelectedTime, setSelectedTime] = useState("1 ngày");

  const [CoinChart, setCoinChart] = useState("BITCOIN");

  const coinName = route.params.id;
  const coinAddress = route.params.address ?? {};
  const coinAddressTRC = route.params.addressTRC ?? {};
  const coinBalance = route.params.balance;
  const coinPrice = route.params.coinPrice;

  const [Transaction, setTransaction] = useState([]);

  useEffect(() => {
    if (coinName === "BTC") {
      setCoinChart("BITCOIN");
      return;
    }
    if (coinName === "ETH") {
      setCoinChart("ETHEREUM");
      return;
    }
    if (coinName === "XRP") {
      setCoinChart("XRP");
      return;
    }
    if (coinName === "WAVES") {
      setCoinChart("WAVES");
      return;
    }
    if (coinName === "BCH") {
      setCoinChart("BITCOIN-CASH");
      return;
    }
    if (coinName === "BCH") {
      setCoinChart("BINANCE-COIN");
      return;
    }
    if (coinName === "WAVES") {
      setCoinChart("WAVES");
      return;
    }
    if (coinName === "LTC") {
      setCoinChart("LITECOIN");
      return;
    }
    if (coinName === "TRX") {
      setCoinChart("TRON");
      return;
    }
  }, []);

  return (
    <>
      <View style={[mainStyles.container]}>
        <Popup type="success" title="Đã copy" isModalVisible={isModalVisible} />
        {/* <View style={{flexDirection: 'row',justifyContent: 'center', paddingVertical: 20}}>
                   <View> 
                        <Text style={{color: percent24h < 0  ? 'red' : '#26a65b', fontSize: 16, textAlign: 'center'}}>{`$${coinNumbers[coinName.toLowerCase()].exchange_rate.exchange.usd} (${percent24h}%)`}</Text>
                   </View>
                </View> */}

        <View
          style={{
            position: "relative",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0)",
              width: 50,
              height: 50,
              position: "absolute",
              bottom: "18%",
              left: "16%",
              zIndex: 9999,
            }}
          ></View>
          <WebView
            originWhitelist={["*"]}
            // source={{
            //   html: `<script src="https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js"></script>
            //      <coingecko-coin-compare-chart-widget  coin-ids="${
            //        coinName === "KDG"
            //          ? "kingdom-game-4-0"
            //          : coinName === "ETH"
            //          ? "ethereum"
            //          : coinName === "TRX"
            //          ? "tron"
            //          : coinName === "USDT"
            //          ? "tether"
            //          : coinName === "KNC"
            //          ? "kyber-network"
            //          : coinName === "MCH"
            //          ? "meconcash"
            //          : coinName === "TOMO"
            //          ? "tomochain"
            //          : "bitcoin"
            //      }" currency="usd" locale="en"></coingecko-coin-compare-chart-widget>`,
            // }}
            source={{
              uri: `https://charts.cointrader.pro/charts.html?coin=${CoinChart}%3AUSD`,
            }}
            scalesPageToFit={true}
            bounces={false}
            javaScriptEnabled
            style={{ height: 450, width: "100%" }}
            automaticallyAdjustContentInsets={false}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: windowHeight / 25,
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DepositPage2", {
                id: coinName,
                address: coinAddress,
                addressTRC: coinAddressTRC ? coinAddressTRC : "",
              })
            }
            style={{ width: windowWidth / 2.3 }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#642c83", "#642c83"]}
              style={{
                alignItems: "center",
                padding: windowWidth / 38,
                width: "100%",
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {checkLanguage({ vi: "NẠP", en: `DEPOSIT` }, language)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("WithdrawPage2", {
                id: coinName,
                address: coinAddress,
                balance: coinBalance,
              })
            }
            style={{ width: windowWidth / 2.3 }}
          >
            <View
              style={{
                alignItems: "center",
                borderColor: "#642c83",
                borderWidth: 2,
                padding: windowWidth / 38,
                width: "100%",
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "#642c83" }}>
                {checkLanguage({ vi: "RÚT", en: `WITHDRAW` }, language)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: 10,
            }}
          >
            <View>
              <Text
                style={{ color: "#642c83", fontSize: 18, fontWeight: "bold" }}
              >
                {checkLanguage({ vi: "Lịch sử", en: `Transaction` }, language)}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image source={emptyicon} />
            <Text
              style={{
                color: display === 1 ? "#989a9c" : "rgba(255,255,255,0.5)",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              {checkLanguage(
                { vi: "Không có dữ liệu", en: `No data` },
                language
              )}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
