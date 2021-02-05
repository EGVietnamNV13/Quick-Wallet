import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  Share,
  Clipboard,
} from "react-native";
import { mainStyles } from "../../../styles";
import { Header2 } from "../../Header";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheck,
  faChevronRight,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import QRCode from "../../QRGenerate/QRCode";
import Popup from "../../Popup/Popup";
import ticker from "../../../assets/images/ticker.png";
import { checkLanguage } from "../../../helper";

import { useSelector } from "react-redux";
// ------------------Icon---------------------
import kdgicon from "../../../assets/images/IconCoin/KDG.png";
import ethicon from "../../../assets/images/IconCoin/ETH.png";
import trxicon from "../../../assets/images/IconCoin/TRX.png";
import usdticon from "../../../assets/images/IconCoin/USDT.png";
import kncicon from "../../../assets/images/IconCoin/KNC.png";
import mchicon from "../../../assets/images/IconCoin/MCH.png";
import tomoicon from "../../../assets/images/IconCoin/TOMO.png";
import btcicon from "../../../assets/images/IconCoin/BTC.png";

// ------------------------------------------
import logo from "../../../assets/logo.png";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function App({ setOutScrollView, setOutScrollViewTop }) {
  const language = useSelector((state) => state.language);
  const display = useSelector((state) => state.display);

  const [Width, setWidth] = useState(0);

  const [sendTo, setSendTo] = useState();
  const [address, setAddress] = useState();
  const [searchVal, setSearchVal] = useState();
  const [SelectedType, setSelectedType] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const [isModalVisible, setModalVisible] = useState(false);
  const coinName = route.params.id;
  const coinAddress = route.params.address ?? {};
  const coinAddressTRC = route.params.addressTRC ?? {};
  const coinImg = route.params.coinImg ?? {};

  useEffect(() => {
    setOutScrollViewTop(
      <Header2
        title={
          checkLanguage({ vi: "Nạp ", en: "Deposit " }, language) + coinName
        }
      />
    );
  }, []);

  // useEffect(() => {
  //   setOutScrollView(
  //     <TouchableOpacity
  //       onPress={onShare}
  //     // style={{ marginBottom: windowHeight / 25 }}
  //     >
  //       <View
  //         style={{
  //           alignItems: "center",
  //           justifyContent: "center",
  //           // marginBottom: 40,
  //         }}
  //       >
  //         <LinearGradient
  //           colors={["#642c83", "#642c83"]}
  //           style={{
  //             backgroundColor: "#2e394f",
  //             alignItems: "center",
  //             justifyContent: "center",
  //             borderRadius: 30,
  //             width: "92%",
  //             height: windowHeight / 14,
  //           }}
  //         >
  //           <Text style={{ color: "#fff", fontSize: 16 }}>
  //             {checkLanguage(
  //               { vi: "Chia sẻ địa chỉ", en: "Share your address" },
  //               language
  //             )}
  //           </Text>
  //         </LinearGradient>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Địa chỉ ví của tôi
              \n${coinAddress}
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
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setTimeout(function () {
      setModalVisible(false);
    }, 1000);
  };

  const copyHandler = () => {
    Clipboard.setString(coinAddress);
    toggleModal();
  };

  return (
    <>
      <View style={mainStyles.container}>
        <View onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          <Popup
            type="success"
            title="Đã copy"
            isModalVisible={isModalVisible}
          />
          <View style={{ paddingTop: 15, alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: display === 1 ? "#fff" : "rgba(40,51,73,0.8)",
                width: "90%",
                padding: 20,
                borderRadius: 5,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: display === 1 ? "#283349" : "#fff" }}>
                {coinName}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Deposit")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Text
                  style={{
                    color: display === 1 ? "#283349" : "rgba(255,255,255,0.5)",
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

            {coinName === "USDT" ? (
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 60,
                  width: "100%",
                  paddingTop: 30,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: display === 1 ? "#283349" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {checkLanguage(
                    { vi: "Chọn loại", en: "Select type" },
                    language
                  )}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => setSelectedType(0)}
                    style={{
                      backgroundColor:
                        SelectedType === 0 ? "#fac800" : "#ddd9d8",
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {SelectedType === 0 ? <Image source={ticker} /> : null}
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: display === 1 ? "#283349" : "#fff",
                      paddingLeft: 10,
                    }}
                  >
                    ERC-20
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => setSelectedType(1)}
                    style={{
                      backgroundColor:
                        SelectedType === 1 ? "#fac800" : "#ddd9d8",
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {SelectedType === 1 ? <Image source={ticker} /> : null}
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: display === 1 ? "#283349" : "#fff",
                      paddingLeft: 10,
                    }}
                  >
                    TRC-20
                  </Text>
                </View>
              </View>
            ) : null}

            <View style={{ paddingTop: 35 }}>
              <Text
                style={{
                  color: display === 1 ? "#909294" : "rgba(255,255,255,0.7)",
                }}
              >
                {checkLanguage(
                  { vi: "Scan tại đây để nạp", en: "Scan here to deposit" },
                  language
                )}
              </Text>
            </View>
            <View>
              <QRCode
                value={SelectedType === 0 ? coinAddress : coinAddressTRC}
                logo={logo}
              />
            </View>
            <View>
              <Text
                style={{
                  color: display === 1 ? "#909294" : "rgba(255,255,255,0.7)",
                }}
              >
                {checkLanguage(
                  {
                    vi: "Hoặc sao chép mã tại đây",
                    en: "Or copy the code here",
                  },
                  language
                )}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={copyHandler} style={{ paddingTop: 5 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: display === 1 ? "#283349" : "rgba(84,86,89, 0.9)",
                      paddingRight: 5,
                    }}
                  >
                    {SelectedType === 0 ? coinAddress : coinAddressTRC}
                  </Text>
                  <FontAwesomeIcon size={15} color="#fac800" icon={faCopy} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={onShare}
          style={{ marginTop: windowHeight / 25 }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              // marginBottom: 40,
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
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>
                {checkLanguage(
                  { vi: "Chia sẻ địa chỉ", en: "Share your address" },
                  language
                )}
              </Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
